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

export async function POST(request: NextRequest) {
  try {
    const env = envSchema.parse(process.env);
    const supabase = initializeSupabase();
    const genAI = initializeGemini();
    
    const { articleId, action } = await request.json();
    
    if (!articleId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameter: articleId' 
        },
        { status: 400 }
      );
    }
    
    // Fetch the raw article from the database
    const { data: rawArticle, error: fetchError } = await supabase
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
    
    if (!rawArticle) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    if (action === 'generate-summary') {
      // Generate a summary using Gemini
      const prompt = `You are an expert technology journalist. Create a concise, well-written summary of the following article that captures the key points. The summary should be informative but brief, around 100-150 words. Write it in a style that appeals to developers and tech enthusiasts.

Article Title: ${rawArticle.title}

Article Content: ${rawArticle.content}`;
      
      const result = await model.generateContent(prompt);
      const summary = await result.response.text();
      
      // Update the article in the database with the generated summary
      const { data: updatedArticle, error: updateError } = await supabase
        .from('news_articles')
        .update({ summary })
        .eq('id', articleId)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating article with summary:', updateError);
        return NextResponse.json(
          { error: 'Failed to update article with summary' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Summary generated and saved successfully',
        summary,
        article: updatedArticle
      });
    } else if (action === 'generate-commentary') {
      // Generate commentary on the article using Gemini
      const prompt = `You are a tech industry analyst with deep knowledge of software development, AI, and emerging technologies. Provide thoughtful commentary on the following article that would be valuable to developers and tech enthusiasts. Focus on implications for the industry, potential impacts on developers, or technical insights. Keep it concise but insightful.

Article Title: ${rawArticle.title}

Article Content: ${rawArticle.content}`;
      
      const result = await model.generateContent(prompt);
      const commentary = await result.response.text();
      
      // Update the article with the generated commentary
      const enhancedContent = `${rawArticle.content}\\n\\n## Commentary\\n\\n${commentary}`;
      
      const { data: updatedArticle, error: updateError } = await supabase
        .from('news_articles')
        .update({ content: enhancedContent })
        .eq('id', articleId)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating article with commentary:', updateError);
        return NextResponse.json(
          { error: 'Failed to update article with commentary' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Commentary generated and saved successfully',
        commentary,
        article: updatedArticle
      });
    } else if (action === 'enhance-content') {
      // Enhance the entire content with Gemini
      const prompt = `You are an expert technology journalist. Improve the following article content to make it more engaging and informative for developers and tech enthusiasts. Enhance the readability, clarify technical concepts, and structure the content for better understanding. Keep the factual information accurate while improving the presentation.

Article Title: ${rawArticle.title}

Current Content: ${rawArticle.content}`;
      
      const result = await model.generateContent(prompt);
      const enhancedContent = await result.response.text();
      
      // Update the article with the enhanced content
      const { data: updatedArticle, error: updateError } = await supabase
        .from('news_articles')
        .update({ content: enhancedContent })
        .eq('id', articleId)
        .select()
        .single();
      
      if (updateError) {
        console.error('Error updating article with enhanced content:', updateError);
        return NextResponse.json(
          { error: 'Failed to update article with enhanced content' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Content enhanced and saved successfully',
        article: updatedArticle
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action specified'
    }, { status: 400 });
  } catch (error) {
    console.error('Error processing article with Gemini AI:', error);
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