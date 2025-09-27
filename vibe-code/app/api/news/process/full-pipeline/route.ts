import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import Parser from 'rss-parser';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Environment validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  GOOGLE_GENAI_API_KEY: z.string(),
});

// Initialize Supabase client
const initializeSupabase = () => {
  const env = envSchema.parse(process.env);
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY, // Using service role key for admin operations
    {
      auth: {
        persistSession: false,
      },
    }
  );
};

// Initialize Google Generative AI client
const initializeGemini = () => {
  const env = envSchema.parse(process.env);
  return new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
};

// Function to check if content is relevant to developer community
async function checkRelevanceWithAI(content: string, title: string): Promise<boolean> {
  const env = envSchema.parse(process.env);
  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  try {
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

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const env = envSchema.parse(process.env);
    const supabase = initializeSupabase();
    const genAI = initializeGemini();
    
    const { rssUrl, sourceName, maxArticles = 5 } = await request.json();
    
    if (!rssUrl || !sourceName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters: rssUrl and sourceName' 
        },
        { status: 400 }
      );
    }
    
    // Parse the RSS feed
    const parser = new Parser();
    let feed;
    try {
      feed = await parser.parseURL(rssUrl);
    } catch (error) {
      console.error('Error parsing RSS feed:', error);
      return NextResponse.json(
        { error: `Failed to parse RSS feed: ${(error as Error).message}` },
        { status: 500 }
      );
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
        const initialArticle = {
          admin_id: 'system', // This would be the admin user ID in real impl
          title: item.title || 'Untitled Article',
          summary: '',
          content: item['content:encoded'] || item.content || item.description || '',
          source_name: sourceName,
          source_url: item.link || rssUrl,
          crawled_at: new Date().toISOString(),
          is_published: false, // Draft status
        };
        
        const { data: draftArticle, error: insertError } = await supabase
          .from('news_articles')
          .insert([initialArticle])
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
          const genAI = initializeGemini();
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
        const isRelevant = await checkRelevanceWithAI(draftArticle.content, draftArticle.title);
        
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
    
    return NextResponse.json({
      success: true,
      message: `Processing completed for ${sourceName}`,
      processedArticles,
      failedArticles,
      summary: {
        processed: processedArticles.length,
        failed: failedArticles.length,
        totalAttempted: itemsToProcess.length
      }
    });
  } catch (error) {
    console.error('Error in full processing pipeline:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof z.ZodError 
          ? 'Missing environment variables' 
          : (error as Error).message 
      },
      { status: 500 }
    );
  }
}