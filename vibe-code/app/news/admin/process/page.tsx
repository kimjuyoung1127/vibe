"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import NewsProcessHeader from './components/NewsProcessHeader';
import NewsProcessSteps from './components/NewsProcessSteps';
import ProcessButton from './components/ProcessButton';
import StatusMessage from './components/StatusMessage';
import { processNewsSources, runFullProcessingPipeline } from './actions';

const ProcessNewsPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // Using the imported supabase client instance
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      setCurrentUser(user.id);
      
      // Check if user is admin (in a real app, you'd have a user role system)
      // For now, we'll allow all authenticated users
      setIsAdmin(true);
    };
    
    checkAdmin();
  }, [router]);

  const handleProcessNews = async () => {
    setIsProcessing(true);
    setProcessingMessage('Starting news processing...');
    setError(null);
    
    try {
      // Step 1: Fetch available RSS sources using server action
      setProcessingMessage('Fetching RSS sources...');
      const sourcesResult = await processNewsSources();
      
      if (!sourcesResult.success) {
        throw new Error(`Failed to fetch RSS sources: ${sourcesResult.error || 'Unknown error'}`);
      }
      
      // Step 2: Process each source (we'll process the first few for demonstration)
      const sourcesToProcess = sourcesResult.sources.slice(0, 3); // Process first 3 sources
      
      for (let i = 0; i < sourcesToProcess.length; i++) {
        const source = sourcesToProcess[i];
        setProcessingMessage(`Processing ${source.name} (${i + 1}/${sourcesToProcess.length})...`);
        
        // Call the full processing pipeline using server action
        const result = await runFullProcessingPipeline(source.url, source.name, 5);
        
        if (!result.success) {
          console.error(`Error processing ${source.name}:`, result.error);
          // Continue with other sources even if one fails
          continue;
        }
        
        console.log(`Successfully processed ${source.name}:`, result.summary);
      }
      
      setProcessingMessage('News processing completed successfully!');
      setTimeout(() => {
        router.push('/news/admin');
      }, 1500);
    } catch (err) {
      console.error('Error processing news:', err);
      setError('Failed to process news articles');
      setProcessingMessage('');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p>You must be logged in as an admin to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NewsProcessHeader 
        title="News Processing Pipeline" 
        description="Fetch, process, and prepare news articles for review" 
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-[#161118] dark:text-[#f5f7f8] mb-2">AI-Powered News Curation</h2>
          <p className="text-[#7c608a] dark:text-[#c5b3d1]">
            This process will fetch RSS feeds, use AI to generate summaries and commentary, 
            and save articles for review before publication.
          </p>
        </div>

        <div className="p-6">
          <StatusMessage message={error || ''} type="error" />
          <StatusMessage message={processingMessage} type={processingMessage.includes('successfully') ? 'success' : 'info'} />

          <NewsProcessSteps />

          <div className="flex justify-end">
            <ProcessButton onClick={handleProcessNews} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessNewsPage;