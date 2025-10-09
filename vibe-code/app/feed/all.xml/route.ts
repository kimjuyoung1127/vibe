import { NextResponse } from 'next/server';
import RSS from 'rss';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Create a new RSS feed combining all content types
  const feed = new RSS({
    title: 'Vibe Hub - All Content Feed',
    description: 'All content from Vibe Hub: project showcases, tech reviews, coding lounge discussions, and tech news.',
    feed_url: 'https://vibehub.tech/feed/all.xml',
    site_url: 'https://vibehub.tech',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  try {
    // Array to hold all items for sorting by date
    const allItems: Array<{
      title: string;
      description: string;
      url: string;
      date: string;
      type: string;
    }> = [];

    // Get recent projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, content, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (projectsError) {
      console.error('Error fetching projects:', projectsError);
    } else {
      projects?.forEach((project) => {
        allItems.push({
          title: project.title || 'Untitled Project',
          description: project.description || project.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/projects/${project.id}`,
          date: new Date(project.created_at).toISOString(),
          type: 'project',
        });
      });
    }

    // Get recent news articles
    const { data: news, error: newsError } = await supabase
      .from('news')
      .select('id, title, summary, content, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (newsError) {
      console.error('Error fetching news:', newsError);
    } else {
      news?.forEach((article) => {
        allItems.push({
          title: article.title || 'Untitled News',
          description: article.summary || article.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/news/${article.id}`,
          date: new Date(article.created_at).toISOString(),
          type: 'news',
        });
      });
    }

    // Get recent gear reviews
    const { data: gearReviews, error: gearError } = await supabase
      .from('gear_reviews')
      .select('id, title, description, content, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (gearError) {
      console.error('Error fetching gear reviews:', gearError);
    } else {
      gearReviews?.forEach((review) => {
        allItems.push({
          title: review.title || 'Untitled Review',
          description: review.description || review.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/gear/${review.id}`,
          date: new Date(review.created_at).toISOString(),
          type: 'gear',
        });
      });
    }

    // Get recent community posts
    const { data: communityPosts, error: communityError } = await supabase
      .from('community_posts')
      .select('id, title, content, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (communityError) {
      console.error('Error fetching community posts:', communityError);
    } else {
      communityPosts?.forEach((post) => {
        allItems.push({
          title: post.title || 'Untitled Post',
          description: post.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/community/${post.id}`,
          date: new Date(post.created_at).toISOString(),
          type: 'community',
        });
      });
    }

    // Sort all items by date descending (most recent first)
    allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Add the sorted items to the feed
    allItems.forEach(item => {
      const category = item.type.charAt(0).toUpperCase() + item.type.slice(1);
      feed.item({
        title: item.title,
        description: item.description,
        url: item.url,
        date: item.date,
        categories: [category],
      });
    });

    const feedXml = feed.xml();

    return new NextResponse(feedXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating all content RSS feed:', error);
    
    // Return an empty RSS feed in case of error
    const emptyFeed = new RSS({
      title: 'Vibe Hub - All Content Feed',
      description: 'All content from Vibe Hub: project showcases, tech reviews, coding lounge discussions, and tech news.',
      feed_url: 'https://vibehub.tech/feed/all.xml',
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