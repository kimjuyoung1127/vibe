// app/community/EditPostModal.tsx
// This component represents the modal for editing a community post

import React from 'react';
import { EditPostModalProps } from '@/app/types/community';

const EditPostModal: React.FC<EditPostModalProps> = ({
  isOpen,
  postToEdit,
  editTitle,
  editContent,
  editTags,
  setEditTitle,
  setEditContent,
  setEditTags,
  onClose,
  onSave
}) => {
  if (!isOpen || !postToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-bold mb-4">Edit Post</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            value={editTags.join(', ')}
            onChange={(e) => setEditTags(e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''))}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter tags separated by commas"
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;