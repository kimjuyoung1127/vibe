import { NextResponse } from 'next/server';
import RSS from 'rss';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Create a new RSS feed specifically for news
  const feed = new RSS({
    title: 'Vibe Hub - Latest Tech News & Trends',
    description: 'Curated AI and technology news, trends, and insights from Vibe Hub, featuring the latest in coding, development, and tech innovations.',
    feed_url: 'https://vibehub.tech/feed/news.xml',
    site_url: 'https://vibehub.tech',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  try {
    // Fetch recent news articles from the database
    const { data: news, error: newsError } = await supabase
      .from('news')
      .select('id, title, summary, content, created_at, source_url, author')
      .order('created_at', { ascending: false })
      .limit(20);

    if (newsError) {
      console.error('Error fetching news:', newsError);
    } else {
      news?.forEach((article) => {
        feed.item({
          title: article.title || 'Untitled News',
          description: article.summary || article.content?.substring(0, 200) || '',
          url: article.source_url || `https://vibehub.tech/news/${article.id}`,
          author: article.author || 'Vibe Hub',
          date: new Date(article.created_at).toISOString(),
        });
      });
    }

    const feedXml = feed.xml();

    return new NextResponse(feedXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating news RSS feed:', error);
    
    // Return an empty RSS feed in case of error
    const emptyFeed = new RSS({
      title: 'Vibe Hub - Latest Tech News & Trends',
      description: 'Curated AI and technology news, trends, and insights from Vibe Hub.',
      feed_url: 'https://vibehub.tech/feed/news.xml',
      site_url: 'https://vibehub.tech',
      language: 'en',
      pubDate: new Date().toUTCString(),
      ttl: 60,
    });

    return new NextResponse(emptyFeed.xml(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}