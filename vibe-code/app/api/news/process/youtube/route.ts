import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
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

// Function to extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Function to fetch YouTube transcript
async function fetchTranscriptFromYouTube(videoId: string): Promise<string> {
  try {
    // This is a placeholder - in a real implementation, you would use a service like:
    // 1. youtube-transcript-api (npm package)
    // 2. A custom solution with YouTube's API
    // 3. A third-party service
    
    // For now, we'll simulate fetching the transcript
    // In a real implementation, you would make an API call to get the actual transcript
    
    // Example using a hypothetical API:
    const response = await fetch(`https://api.example.com/youtube-transcripts/${videoId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.transcript || '';
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);
    throw new Error(`Failed to fetch transcript for video ${videoId}: ${(error as Error).message}`);
  }
}

// Function to check if content is relevant to developer community
async function checkRelevanceWithAI(content: string, title: string): Promise<boolean> {
  const env = envSchema.parse(process.env);
  const genAI = new GoogleGenerativeAI(env.GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  try {
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

Video Title: ${title}

Transcript Content: ${content}`;
    
    const result = await model.generateContent(prompt);
    const response = (await result.response.text()).trim().toUpperCase();
    return response === 'YES';
  } catch (error) {
    console.error('Error checking relevance:', error);
    // If AI check fails, default to true to not block content
    return true;
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

export async function POST(request: NextRequest) {
  try {
    const env = envSchema.parse(process.env);
    const supabase = initializeSupabase();
    const genAI = initializeGemini();
    
    const { videoUrl, videoTitle } = await request.json();
    
    if (!videoUrl || !videoTitle) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters: videoUrl and videoTitle' 
        },
        { status: 400 }
      );
    }
    
    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid YouTube URL provided' 
        },
        { status: 400 }
      );
    }
    
    try {
      // Fetch transcript from YouTube
      const transcript = await fetchTranscriptFromYouTube(videoId);
      
      if (!transcript) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'No transcript found for the video' 
          },
          { status: 400 }
        );
      }
      
      // Pre-filter using keyword matching to quickly eliminate non-relevant content
      const passesPreFilter = preFilterByKeywords(transcript, videoTitle);
      
      // Only run AI validation if it passes the pre-filter
      const isRelevant = passesPreFilter ? await checkRelevanceWithAI(transcript, videoTitle) : false;
      
      if (!isRelevant) {
        return NextResponse.json({
          success: true,
          message: 'Video transcript is not relevant to developer community',
          isRelevant: false
        });
      }
      
      // Create news article from the YouTube video
      const initialArticle = {
        admin_id: 'system', // This would be the admin user ID in real impl
        title: videoTitle,
        summary: '', // Will be generated later
        content: `# YouTube Video Summary: ${videoTitle}\n\n${transcript}\n\n[Video Link](${videoUrl})`,
        source_name: 'YouTube Transcript',
        source_url: videoUrl,
        crawled_at: new Date().toISOString(),
        is_published: false, // Draft status
      };
      
      // Save the article to the database as a draft
      const { data: draftArticle, error: insertError } = await supabase
        .from('news_articles')
        .insert([initialArticle])
        .select()
        .single();
      
      if (insertError) {
        console.error('Error saving YouTube transcript article to database:', insertError);
        return NextResponse.json(
          { error: 'Failed to save YouTube transcript article to database' },
          { status: 500 }
        );
      }
      
      // Generate summary using Gemini
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const prompt = `You are an expert technology journalist. Create a concise, well-written summary of the following YouTube video transcript that captures the key points. The summary should be informative but brief, around 100-150 words. Write it in a style that appeals to developers and tech enthusiasts.

Video Title: ${draftArticle.title}

Transcript Content: ${transcript}`;
        
        const result = await model.generateContent(prompt);
        const summary = (await result.response.text()).trim();
        
        // Update the article with the generated summary
        await supabase
          .from('news_articles')
          .update({ summary })
          .eq('id', draftArticle.id);
      } catch (summaryError) {
        console.error('Error generating summary for YouTube transcript:', summaryError);
        // Continue processing even if summary generation fails
      }
      
      // Update validation status after AI processing
      await supabase
        .from('news_articles')
        .update({
          is_relevant: isRelevant,
          validation_status: 'approved', // YouTube videos that pass relevance check are approved
          validated_at: new Date().toISOString(),
        })
        .eq('id', draftArticle.id);
      
      return NextResponse.json({
        success: true,
        message: 'YouTube transcript processed successfully',
        article: {
          ...draftArticle,
          is_relevant: isRelevant
        }
      });
    } catch (error) {
      console.error('Error processing YouTube video:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: (error as Error).message 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in YouTube processing API:', error);
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