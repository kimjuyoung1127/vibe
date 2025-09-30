// Community-related type definitions

// Interface for a community post
export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  comment_count: number;
  vibe_check_count: number;
  username: string;
  avatar_url: string | null;
  tags: string[];
}

// Props for the PostItem component
export interface PostItemProps {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  comment_count: number;
  vibe_check_count: number;
  username: string;
  avatar_url: string | null;
  tags: string[];
  currentUser: string | null;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  contentType?: 'project' | 'comment' | 'tool_review' | 'community_post';
  onReportClick?: (targetId: string, targetType: string) => void;
}

// Props for the EditPostModal component
export interface EditPostModalProps {
  isOpen: boolean;
  postToEdit: Post | null;
  editTitle: string;
  editContent: string;
  editTags: string[];
  setEditTitle: (title: string) => void;
  setEditContent: (content: string) => void;
  setEditTags: (tags: string[]) => void;
  onClose: () => void;
  onSave: () => void;
}

// Interface for form data in community posts
export interface FormData {
  title: string;
  content: string;
  tags: string[];
}

// Props for the CommunityPostContentSection component
export interface CommunityPostContentSectionProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}