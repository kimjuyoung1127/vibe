import { NextResponse } from 'next/server';
import RSS from 'rss';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Create a new RSS feed for gear reviews
  const feed = new RSS({
    title: 'Vibe Hub - Gear & Tech Reviews',
    description: 'Reviews of tools, technologies, and hardware for developers, curated by the Vibe Hub community.',
    feed_url: 'https://vibehub.tech/feed/gear.xml',
    site_url: 'https://vibehub.tech',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  try {
    // Fetch recent gear reviews from the database
    const { data: gearReviews, error: gearError } = await supabase
      .from('gear_reviews')
      .select('id, title, description, content, created_at, author')
      .order('created_at', { ascending: false })
      .limit(20);

    if (gearError) {
      console.error('Error fetching gear reviews:', gearError);
    } else {
      gearReviews?.forEach((review) => {
        feed.item({
          title: review.title || 'Untitled Review',
          description: review.description || review.content?.substring(0, 200) || '',
          url: `https://vibehub.tech/gear/${review.id}`,
          author: review.author || 'Vibe Hub Community',
          date: new Date(review.created_at).toISOString(),
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
    console.error('Error generating gear reviews RSS feed:', error);
    
    // Return an empty RSS feed in case of error
    const emptyFeed = new RSS({
      title: 'Vibe Hub - Gear & Tech Reviews',
      description: 'Reviews of tools, technologies, and hardware for developers.',
      feed_url: 'https://vibehub.tech/feed/gear.xml',
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