import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// This endpoint doesn't require environment variables since it returns predefined sources

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching RSS sources...');
    
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
    
    console.log('Successfully returned RSS sources:', techNewsSources.length);
    return NextResponse.json({
      success: true,
      sources: techNewsSources,
      count: techNewsSources.length
    });
  } catch (error) {
    console.error('Error fetching RSS sources:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
}