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
  GOOGLE_GEMINI_API_KEY: z.string(),
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
  return new GoogleGenerativeAI(env.GOOGLE_GEMINI_API_KEY);
};

// Function to parse RSS feed
async function parseRSSFeed(rssUrl: string): Promise<any[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(rssUrl);
    
    // Return the feed items
    return feed.items;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    throw new Error(`Failed to parse RSS feed: ${(error as Error).message}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const env = envSchema.parse(process.env);
    const supabase = initializeSupabase();
    
    const { sourceUrl, sourceName, maxArticles = 10 } = await request.json();
    
    if (!sourceUrl || !sourceName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters: sourceUrl and sourceName' 
        },
        { status: 400 }
      );
    }
    
    // Parse the RSS feed
    const feedItems = await parseRSSFeed(sourceUrl);
    
    // Limit the number of articles to process
    const itemsToProcess = feedItems.slice(0, maxArticles);
    
    // Process each feed item
    const processedArticles = [];
    
    for (const item of itemsToProcess) {
      // In a real implementation, this would call the AI to generate summaries
      // For now, we'll create placeholder data
      const article = {
        admin_id: 'system', // This would be the admin user ID in real impl
        title: item.title || 'Untitled Article',
        summary: item.description || 'No summary available',
        content: item.content || item.description || '',
        source_name: sourceName,
        source_url: item.link || sourceUrl,
        crawled_at: new Date().toISOString(),
        is_published: false, // Draft status
      };
      
      // Save the article to the database as a draft
      const { data, error } = await supabase
        .from('news_articles')
        .insert([article])
        .select()
        .single();
      
      if (error) {
        console.error('Error saving article to database:', error);
        // Continue processing other articles even if one fails
        continue;
      }
      
      processedArticles.push(data);
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${processedArticles.length} articles from ${sourceName}`,
      processedArticles,
      totalFetched: feedItems.length
    });
  } catch (error) {
    console.error('Error processing RSS feed:', error);
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