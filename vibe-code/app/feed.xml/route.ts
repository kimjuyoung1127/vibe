import { NextResponse } from 'next/server';
import RSS from 'rss';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Create a new RSS feed
  const feed = new RSS({
    title: 'Vibe Hub - Developer Community',
    description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style. Share projects, reviews, and connect with like-minded developers.',
    feed_url: 'https://vibehub.tech/feed.xml',
    site_url: 'https://vibhub.tech',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  try {
    // Fetch recent posts from the database
    // This example includes projects, news, and community posts
    // You may adjust this query based on your specific database schema
    
    // Get recent projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, content, created_at, author_id')
      .order('created_at', { ascending: false })
      .limit(20);

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
    } else {
      projects?.forEach((project) => {
        feed.item({
          title: project.title || 'Untitled Project',
          description: project.description || project.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/projects/${project.id}`,
          date: new Date(project.created_at).toISOString(),
        });
      });
    }

    // Get recent news articles
    const { data: news, error: newsError } = await supabase
      .from('news')
      .select('id, title, summary, content, created_at, source_url')
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
          date: new Date(article.created_at).toISOString(),
        });
      });
    }

    // Get recent community posts
    const { data: communityPosts, error: communityError } = await supabase
      .from('community_posts')
      .select('id, title, content, created_at, author_id')
      .order('created_at', { ascending: false })
      .limit(20);

    if (communityError) {
      console.error('Error fetching community posts:', communityError);
    } else {
      communityPosts?.forEach((post) => {
        feed.item({
          title: post.title || 'Untitled Post',
          description: post.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/community/${post.id}`,
          date: new Date(post.created_at).toISOString(),
        });
      });
    }

    // Sort all items by date to ensure most recent items are first
    const feedXml = feed.xml();

    return new NextResponse(feedXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return an empty RSS feed in case of error
    const emptyFeed = new RSS({
      title: 'Vibe Hub - Developer Community',
      description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style.',
      feed_url: 'https://vibehub.tech/feed.xml',
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