import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Environment validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
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

// Define the structure for news articles
interface NewsArticle {
  id?: string;
  admin_id: string;
  title: string;
  summary: string;
  hero_image_url?: string;
  content: string;
  source_name: string;
  source_url: string;
  crawled_at: string;
  published_at?: string;
  is_published: boolean;
  vibe_check_count?: number;
  comment_count?: number;
}

export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    const env = envSchema.parse(process.env);
    
    // Initialize Supabase client
    const supabase = initializeSupabase();
    
    // Fetch query parameters
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    if (action === 'fetch-rss') {
      // This would be handled by a scheduled job or manual trigger
      // For now, we'll return a success message to indicate the endpoint exists
      return NextResponse.json({
        success: true,
        message: 'RSS fetch process initiated',
        timestamp: new Date().toISOString()
      });
    } else if (action === 'get-articles') {
      // Fetch articles from database
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
          { error: 'Failed to fetch articles' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        articles: data,
        count: data?.length || 0
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'News processing API is running',
      availableEndpoints: [
        '/api/news/process?action=fetch-rss',
        '/api/news/process?action=get-articles'
      ],
      additionalEndpoints: [
        '/api/news/process/sources',  // Get available RSS sources
        '/api/news/process/feed',     // Process specific RSS feed
        '/api/news/process/full-pipeline', // Complete processing from RSS to DB
        '/api/news/process/validation', // Validate content relevance
        '/api/news/process/ai',       // Enhance content with AI
        '/api/news/process/youtube',  // Process YouTube transcripts
        '/api/news/process/social'    // Process social media posts
      ]
    });
  } catch (error) {
    console.error('API Error:', error);
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

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    const env = envSchema.parse(process.env);
    
    // Initialize Supabase client
    const supabase = initializeSupabase();
    
    const { action, ...requestData } = await request.json();
    
    if (action === 'process-rss') {
      // Process RSS feed and create draft articles
      const { rssUrl, sourceName } = requestData;
      
      if (!rssUrl || !sourceName) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Missing required parameters: rssUrl and sourceName' 
          },
          { status: 400 }
        );
      }
      
      // This is where we would fetch and parse the RSS feed
      // For now, we'll return a success message
      return NextResponse.json({
        success: true,
        message: `RSS feed processing initiated for ${sourceName}`,
        rssUrl,
        processedAt: new Date().toISOString()
      });
    } else if (action === 'create-draft') {
      // Create a draft article
      const articleData: Omit<NewsArticle, 'id'> = requestData;
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert([{ ...articleData, is_published: false }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating draft article:', error);
        return NextResponse.json(
          { error: 'Failed to create draft article' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Draft article created successfully',
        article: data
      });
    } else if (action === 'publish-article') {
      // Publish an article
      const { articleId } = requestData;
      
      if (!articleId) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Missing required parameter: articleId' 
          },
          { status: 400 }
        );
      }
      
      const { data, error } = await supabase
        .from('news_articles')
        .update({ 
          is_published: true, 
          published_at: new Date().toISOString() 
        })
        .eq('id', articleId)
        .select()
        .single();
      
      if (error) {
        console.error('Error publishing article:', error);
        return NextResponse.json(
          { error: 'Failed to publish article' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Article published successfully',
        article: data
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action specified'
    }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);
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