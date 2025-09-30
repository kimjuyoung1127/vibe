'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Environment validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  GOOGLE_GEMINI_API_KEY: z.string(),
});

export async function processNewsSources() {
  try {
    // Validate environment variables
    envSchema.parse(process.env);

    // This would call the same logic as our API routes but server-side
    // For now, returning predefined sources like in the API route
    const techNewsSources = [
 
      {
        id: 'theverge',
        name: 'The Verge',
        url: 'https://www.theverge.com/rss/index.xml',
        description: 'Technology and science news'
      },
      {
        id: 'recode',
        name: 'Recode',
        url: 'https://www.vox.com/rss/recode/index.xml',
        description: 'Technology and business news'
      },
      {
        id: 'hackernews',
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/rss',
        description: 'News for developers and entrepreneurs'
      },
      {
        id: 'githubtrending',
        name: 'GitHub Trending',
        url: 'https://github.com/trending.atom',
        description: 'Trending repositories on GitHub'
      },
      {
        id: 'javascript',
        name: 'r/javascript',
        url: 'https://www.reddit.com/r/javascript/.rss',
        description: 'JavaScript programming subreddit'
      },
      {
        id: 'python',
        name: 'r/Python',
        url: 'https://www.reddit.com/r/Python/.rss',
        description: 'Python programming subreddit'
      },
      {
        id: 'webdev',
        name: 'r/webdev',
        url: 'https://www.reddit.com/r/webdev/.rss',
        description: 'Web development subreddit'
      },
      {
        id: 'machinelearning',
        name: 'r/MachineLearning',
        url: 'https://www.reddit.com/r/MachineLearning/.rss',
        description: 'Machine learning subreddit'
      },
      {
        id: 'cybersecurity',
        name: 'r/cybersecurity',
        url: 'https://www.reddit.com/r/cybersecurity/.rss',
        description: 'Cybersecurity news and discussions'
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
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

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

        // Pre-filter using keyword matching to quickly eliminate non-relevant content
        const passesPreFilter = preFilterByKeywords(draftArticle.content, draftArticle.title);
        
        // Only run AI validation if it passes the pre-filter
        const isRelevant = passesPreFilter ? await checkRelevanceWithAI(draftArticle.content, draftArticle.title, genAI) : false;

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

// Function for keyword-based pre-filtering
function preFilterByKeywords(content: string, title: string): boolean {
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  // Keywords that indicate developer/IT relevance
  const relevantKeywords = [
    'javascript', 'python', 'typescript', 'react', 'node', 'devops', 'docker', 
    'kubernetes', 'api', 'database', 'sql', 'nosql', 'git', 'github', 'gitlab',
    'open source', 'program', 'code', 'coding', 'developer', 'engineer', 'programming',
    'algorithm', 'framework', 'library', 'sdk', 'frontend', 'backend', 'fullstack',
    'web development', 'mobile development', 'cybersecurity', 'security', 'hacker',
    'vulnerability', 'patch', 'ai', 'ml', 'artificial intelligence', 'machine learning',
    'data science', 'cloud', 'aws', 'azure', 'gcp', 'cloud computing', 'serverless',
    'container', 'microservices', 'architecture', 'debug', 'testing', 'ci/cd',
    'agile', 'scrum', 'tech stack', 'ide', 'editor', 'vim', 'emacs', 'vs code',
    'compiler', 'runtime', 'framework', 'sdk', 'api', 'rest', 'graphql', 'websocket',
    'blockchain', 'web3', 'cryptocurrency', 'ethereum', 'bitcoin', 'solidity',
    'game engine', 'unity', 'unreal engine', 'gamedev', 'mobile app', 'ios', 'android',
    'linux', 'unix', 'bash', 'terminal', 'shell', 'bash script', 'powershell',
    'sysadmin', 'it', 'infrastructure', 'network', 'protocol', 'tcp/ip', 'http',
    'oauth', 'jwt', 'authentication', 'authorization', 'oauth2', 'sso', 'saml',
    'oauth 2.0', 'jwt token', 'session', 'cookie', 'csrf', 'xss', 'sql injection'
  ];
  
  // Check if any relevant keyword appears in the title or content
  return relevantKeywords.some(keyword => 
    lowerTitle.includes(keyword) || lowerContent.includes(keyword)
  );
}

// Function to check if content is relevant to developer community
async function checkRelevanceWithAI(content: string, title: string, genAI: any): Promise<boolean> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are an expert at identifying technology news relevant to developers and the developer community. Determine if the given article is specifically relevant to one or more of these topics:
- Software development and programming languages
- AI/ML and data science
- Cybersecurity
- Cloud computing and DevOps
- Developer tools (IDEs, frameworks, libraries)
- Tech industry news affecting developers
- Coding best practices
- Emerging technologies with coding applications
- Hardware relevant to development
- IT infrastructure and networking
- Open source projects and communities
- Developer productivity tools
- Technical tutorials or educational content
- Tech company product releases for developers
- Tech conferences and events for developers

Respond with only "YES" if it is relevant or "NO" if it is not relevant.

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