import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Environment validation
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  GOOGLE_GENAI_API_KEY: z.string(),
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
  return new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
};

// Function to check if content is relevant to developer community
async function checkRelevanceWithAI(content: string, title: string): Promise<boolean> {
  const env = envSchema.parse(process.env);
  const genAI = new GoogleGenerativeAI(env.GOOGLE_GENAI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  try {
    const prompt = `You are an expert at identifying technology news relevant to developers and the developer community. Determine if the given article is relevant to software development, programming, emerging tech, AI, cybersecurity, cloud computing, or other topics of interest to developers. Respond with only "YES" if it is relevant or "NO" if it is not relevant.

Article Title: ${title}

Article Content: ${content}`;
    
    const result = await model.generateContent(prompt);
    const response = (await result.response.text()).trim().toUpperCase();
    return response === 'YES';
  } catch (error) {
    console.error('Error checking relevance:', error);
    // If AI check fails, default to true to not block content
    return true;
  }
}

// Function to check for legal compliance issues
function checkLegalCompliance(content: string, title: string): { compliant: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check for potentially problematic content
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  
  // Check for explicit content indicators
  const explicitIndicators = [
    'porn', 'nudity', 'explicit', 'adult content', 'nsfw'
  ];
  
  for (const indicator of explicitIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential explicit content detected: ${indicator}`);
    }
  }
  
  // Check for copyright-related issues
  const copyrightIndicators = [
    'copyright infringement', 'piracy', 'illegal download', 'crack', 'warez'
  ];
  
  for (const indicator of copyrightIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential copyright issue detected: ${indicator}`);
    }
  }
  
  // Check for hate speech indicators
  const hateSpeechIndicators = [
    'hate speech', 'discrimination', 'racist', 'bigotry', 'prejudice'
  ];
  
  for (const indicator of hateSpeechIndicators) {
    if (lowerContent.includes(indicator) || lowerTitle.includes(indicator)) {
      issues.push(`Potential hate speech detected: ${indicator}`);
    }
  }
  
  return {
    compliant: issues.length === 0,
    issues
  };
}

export async function POST(request: NextRequest) {
  try {
    const env = envSchema.parse(process.env);
    const supabase = initializeSupabase();
    
    const { articleId } = await request.json();
    
    if (!articleId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameter: articleId' 
        },
        { status: 400 }
      );
    }
    
    // Fetch the article from the database
    const { data: article, error: fetchError } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', articleId)
      .single();
    
    if (fetchError) {
      console.error('Error fetching article:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch article' },
        { status: 500 }
      );
    }
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Check relevance to developer community
    const isRelevant = await checkRelevanceWithAI(article.content, article.title);
    
    // Check for legal compliance
    const complianceCheck = checkLegalCompliance(article.content, article.title);
    
    // Update the article with validation results
    const validationResults = {
      is_relevant: isRelevant,
      compliance_issues: complianceCheck.issues,
      validated_at: new Date().toISOString(),
    };
    
    const { data: updatedArticle, error: updateError } = await supabase
      .from('news_articles')
      .update({ 
        ...validationResults,
        validation_status: complianceCheck.compliant && isRelevant ? 'approved' : 'flagged'
      })
      .eq('id', articleId)
      .select()
      .single();
    
    if (updateError) {
      console.error('Error updating article with validation results:', updateError);
      return NextResponse.json(
        { error: 'Failed to update article with validation results' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Content validation completed',
      validationResults: {
        isRelevant,
        complianceCheck,
        isValid: complianceCheck.compliant && isRelevant
      },
      article: updatedArticle
    });
  } catch (error) {
    console.error('Error validating content:', error);
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