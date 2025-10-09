import { NextResponse } from 'next/server';
import RSS from 'rss';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Create a new RSS feed for project showcases
  const feed = new RSS({
    title: 'Vibe Hub - Project Showcases',
    description: 'Creative coding projects and experiences shared by the Vibe Hub community.',
    feed_url: 'https://vibehub.tech/feed/projects.xml',
    site_url: 'https://vibehub.tech',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60, // Time to live in minutes
  });

  try {
    // Fetch recent projects from the database
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, content, created_at, author')
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
          author: project.author || 'Vibe Hub Community',
          date: new Date(project.created_at).toISOString(),
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
    console.error('Error generating project showcases RSS feed:', error);
    
    // Return an empty RSS feed in case of error
    const emptyFeed = new RSS({
      title: 'Vibe Hub - Project Showcases',
      description: 'Creative coding projects and experiences shared by the community.',
      feed_url: 'https://vibehub.tech/feed/projects.xml',
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