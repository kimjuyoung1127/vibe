"use client";
// components/ReportModal.tsx
// Modal for reporting inappropriate content
import React, { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string; // ID of the content being reported
  targetType: 'project' | 'comment' | 'tool_review' | 'community_post'; // Type of content
  onSuccess?: () => void; // Callback after successful report
}

interface ReportReason {
  value: string;
  label: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  targetId, 
  targetType,
  onSuccess
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reportReasons: ReportReason[] = [
    { value: 'inappropriate_content', label: 'Inappropriate Content' },
    { value: 'harassment', label: 'Harassment or Bullying' },
    { value: 'spam', label: 'Spam or Scam' },
    { value: 'misinformation', label: 'Misinformation' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason) {
      setError('Please select a reason for your report.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call the Supabase function to submit the report
      const { data, error } = await supabase
        .rpc('submit_report', {
          p_target_id: targetId,
          p_target_type: targetType,
          p_reason: selectedReason,
          p_description: description || null
        });

      if (error) throw error;

      // Reset form and close modal
      setSelectedReason('');
      setDescription('');
      setIsSubmitting(false);
      
      // Execute success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Close the modal after successful submission
      onClose();
    } catch (err: any) {
      console.error('Error submitting report:', err);
      setError(err.message || 'Failed to submit report. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          ></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-background-light dark:bg-background-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-[#161118] dark:text-[#f5f7f8]">
                  Report Content
                </h3>
                <div className="mt-4">
                  <p className="text-sm text-[#7c608a] dark:text-[#c5b3d1]">
                    Help us maintain a positive community by reporting content that violates our guidelines.
                  </p>
                  
                  {error && (
                    <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-1">
                        Reason for report
                      </label>
                      <select
                        id="reason"
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a reason</option>
                        {reportReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-[#161118] dark:text-[#f5f7f8] mb-1">
                        Additional details (optional)
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide more details about your report..."
                        className="w-full bg-white dark:bg-[#0f0f1a] border border-[#e2dbe6] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f7f8] dark:bg-[#0f0f1a] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-[#e2dbe6] shadow-sm px-4 py-2 bg-white dark:bg-[#0f0f1a] text-base font-medium text-[#161118] dark:text-[#f5f7f8] hover:bg-gray-50 dark:hover:bg-[#1a1a2e] focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportModal;