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
      },
      {
        id: 'hackernews',
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/rss',
        description: 'News for developers and entrepreneurs'
      },
      {
        id: 'redditprogramming',
        name: 'r/programming',
        url: 'https://www.reddit.com/r/programming/.rss',
        description: 'Computer programming subreddit'
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