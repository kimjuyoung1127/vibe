'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Environment validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  GOOGLE_GENAI_API_KEY: z.string(),
});

export async function processNewsSources() {
  try {
    // Validate environment variables
    envSchema.parse(process.env);

    // This would call the same logic as our API routes but server-side
    // For now, returning predefined sources like in the API route
    const techNewsSources = [
      {
        id: 'techcrunch',
        name: 'TechCrunch',
        url: 'https://techcrunch.com/feed/',
        description: 'Latest technology and startup news'
      },
      {
        id: 'theverge',
        name: 'The Verge',
        url: 'https://www.theverge.com/rss/index.xml',
        description: 'Technology and science news'
      },
      {
        id: 'arstechnica',
        name: 'Ars Technica',
        url: 'https://feeds.arstechnica.com/arstechnica/index',
        description: 'Technology lab news'
      },
      {
        id: 'recode',
        name: 'Recode',
        url: 'https://www.vox.com/rss/recode/index.xml',
        description: 'Technology and business news'
      }
    ];

    return {
      success: true,
      sources: techNewsSources,
      count: techNewsSources.length
    };
  } catch (error) {
    console.error('Server action error:', error);
    return {
      success: false,
      error: error instanceof z.ZodError 
        ? 'Missing environment variables' 
        : (error as Error).message
    };
  }
}

export async function runFullProcessingPipeline(sourceUrl: string, sourceName: string, maxArticles: number = 5) {
  try {
    // Validate environment variables
    envSchema.parse(process.env);

    // Import necessary dependencies
    const { createClient } = await import('@supabase/supabase-js');
    const Parser = (await import('rss-parser')).default;
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    
    // Initialize clients
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

    // Parse the RSS feed
    const parser = new Parser();
    let feed;
    try {
      feed = await parser.parseURL(sourceUrl);
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      throw new Error(`Failed to parse RSS feed: ${(error as Error).message}`);
    }

    // Limit the number of articles to process
    const itemsToProcess = feed.items.slice(0, maxArticles);

    // Process each feed item
    const processedArticles = [];
    const failedArticles = [];

    for (const item of itemsToProcess) {
      try {
        // Check if we already have this article (by URL or title)
        let { data: existingByUrl, error: errorByUrl } = await supabase
          .from('news_articles')
          .select('id')
          .eq('source_url', item.link)
          .limit(1)
          .single();
          
        if (!existingByUrl) {
          const { data: existingByTitle, error: errorByTitle } = await supabase
            .from('news_articles')
            .select('id')
            .eq('title', item.title)
            .limit(1)
            .single();
            
          existingByUrl = existingByTitle;
        }
        
        const existingArticle = existingByUrl;

        if (existingArticle) {
          // Skip if article already exists
          continue;
        }

        // Create an initial article draft in the database
        // Since this is system-generated content, prepare the article data
        let initialArticleData: any = {
          title: item.title || 'Untitled Article',
          summary: '',
          content: item['content:encoded'] || item.content || item.description || '',
          source_name: sourceName,
          source_url: item.link || sourceUrl,
          crawled_at: new Date().toISOString(),
          is_published: false, // Draft status
        };

        // Only add admin_id if it's available in the environment
        if (process.env.SYSTEM_USER_ID) {
          initialArticleData.admin_id = process.env.SYSTEM_USER_ID;
        }

        const { data: draftArticle, error: insertError } = await supabase
          .from('news_articles')
          .insert([initialArticleData])
          .select()
          .single();

        if (insertError) {
          console.error('Error saving initial article to database:', insertError);
          failedArticles.push({
            title: item.title,
            error: insertError.message,
            source: sourceName
          });
          continue;
        }

        // Generate summary using Gemini
        try {
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

          const prompt = `You are an expert technology journalist. Create a concise, well-written summary of the following article that captures the key points. The summary should be informative but brief, around 100-150 words. Write it in a style that appeals to developers and tech enthusiasts.

Article Title: ${draftArticle.title}

Article Content: ${draftArticle.content}`;

          const result = await model.generateContent(prompt);
          const summary = (await result.response.text()).trim();

          // Update the article with the generated summary
          await supabase
            .from('news_articles')
            .update({ summary })
            .eq('id', draftArticle.id);
        } catch (summaryError) {
          console.error('Error generating summary:', summaryError);
          // Continue processing even if summary generation fails
        }

        // Check relevance to developer community
        const isRelevant = await checkRelevanceWithAI(draftArticle.content, draftArticle.title, genAI);

        // Check for legal compliance
        const complianceCheck = checkLegalCompliance(draftArticle.content, draftArticle.title);

        // Update validation status
        await supabase
          .from('news_articles')
          .update({
            is_relevant: isRelevant,
            compliance_issues: complianceCheck.issues,
            validation_status: complianceCheck.compliant && isRelevant ? 'approved' : 'flagged',
            validated_at: new Date().toISOString(),
          })
          .eq('id', draftArticle.id);

        processedArticles.push({
          ...draftArticle,
          is_relevant: isRelevant,
          compliance_check: complianceCheck
        });
      } catch (articleError) {
        console.error('Error processing article:', articleError);
        failedArticles.push({
          title: item.title,
          error: (articleError as Error).message,
          source: sourceName
        });
      }
    }

    return {
      success: true,
      message: `Processing completed for ${sourceName}`,
      processedArticles,
      failedArticles,
      summary: {
        processed: processedArticles.length,
        failed: failedArticles.length,
        totalAttempted: itemsToProcess.length
      }
    };
  } catch (error) {
    console.error('Server action error in full pipeline:', error);
    return {
      success: false,
      error: error instanceof z.ZodError 
        ? 'Missing environment variables' 
        : (error as Error).message
    };
  }
}

// Function to check if content is relevant to developer community
async function checkRelevanceWithAI(content: string, title: string, genAI: any): Promise<boolean> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are an expert at identifying technology news relevant to developers and the developer community. Determine if the given article is relevant to software development, programming, emerging tech, AI, cybersecurity, cloud computing, or other topics of interest to developers. Respond with only "YES" if it is relevant or "NO" if it is not relevant.

Article Title: ${title}

Article Content: ${content}`;

    const result = await model.generateContent(prompt);
    const response = (await result.response.text()).trim().toUpperCase();
    return response === 'YES';
  } catch (error) {
    console.error('Error checking relevance:', error);
    // If AI check fails, default to true to not block content
    return true;
  }
}

// Function to check for legal compliance issues
function checkLegalCompliance(content: string, title: string): { compliant: boolean; issues: string[] } {
  const issues: string[] = [];

  // Check for potentially problematic content
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // Check for explicit content indicators
  const explicitIndicators = [
    'porn', 'nudity', 'explicit', 'adult content', 'nsfw'
  ];

  for (const indicator of explicitIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential explicit content detected: ${indicator}`);
    }
  }

  // Check for copyright-related issues
  const copyrightIndicators = [
    'copyright infringement', 'piracy', 'illegal download', 'crack', 'warez'
  ];

  for (const indicator of copyrightIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential copyright issue detected: ${indicator}`);
    }
  }

  // Check for hate speech indicators
  const hateSpeechIndicators = [
    'hate speech', 'discrimination', 'racist', 'bigotry', 'prejudice'
  ];

  for (const indicator of hateSpeechIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential hate speech detected: ${indicator}`);
    }
  }

  return {
    compliant: issues.length === 0,
    issues
  };
}