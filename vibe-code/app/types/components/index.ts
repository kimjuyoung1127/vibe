// Component-related type definitions

// Props for the ContentRenderer component
export interface ContentRendererProps {
  content: string;
  maxWidthClass?: string;
  containerClass?: string;
}

// Props for the DescriptionSection component
export interface DescriptionSectionProps {
  description: string;
  setDescription: (description: string) => void;
  errors: Record<string, string>;
}

// Props for the DropdownMenu component
export interface DropdownMenuProps {
  children: React.ReactNode;
  contentId?: string;  // ID of the content being acted upon
  contentType?: 'project' | 'comment' | 'tool_review' | 'community_post'; // Type of content
  targetId?: string; // ID of the content to report
  className?: string;
}

// Props for the GearMediaUpload component
export interface GearMediaUploadProps {
  onMediaUpload: (urls: { heroImageUrl?: string; demoVideoUrl?: string }) => void;
  currentMediaUrls?: { heroImageUrl?: string; demoVideoUrl?: string };
  folderPath?: string;
  maxFileSize?: number; // in bytes, default to 10MB
  acceptedImageTypes?: string[]; // e.g., ['image/jpeg', 'image/png', 'image/gif']
  bucketName?: string; // Supabase storage bucket name
  label?: string;
}

// Props for the ImageUpload component
export interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  currentImageUrl?: string;
  bucketName?: string;
  allowedFileTypes?: string;
  maxFileSize?: number; // in MB
}

// Props for the LoadingSpinner component
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

// Props for the MultiSelectButtonGroup component
export interface MultiSelectButtonGroupProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  title: string;
  placeholder: string;
}

// Props for the NewProjectButton component
export interface NewProjectButtonProps {
  isCollapsed: boolean;
}

// Props for the ProfileImageUpload component
export interface ProfileImageUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError: (error: string) => void;
  currentImageUrl?: string;
  bucketName: string;
  acceptedFileTypes?: string[]; // e.g., ['image/jpeg', 'image/png', 'image/gif']
}

// Type for a report reason
export interface ReportReason {
  id: string;
  reason: string;
  description: string;
}

// Props for the ReportModal component
export interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'project' | 'comment' | 'tool_review' | 'community_post'; // Type of content
}

// Props for the SearchBar component
export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

// Breadcrumb type for structured data
export type Breadcrumb = {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
};

// Structured data type
export type StructuredDataType = {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'BreadcrumbList' | 'ProfilePage' | 'Project' | 'ToolReview';
  [key: string]: any;
};

// Props for the StructuredData component
export interface StructuredDataProps {
  data: StructuredDataType;
}

// Props for the TaglineDropdown component
export interface TaglineDropdownProps {
  selectedTagline: string;
  onSelect: (tagline: string) => void;
  title?: string;
  placeholder?: string;
  error?: string;
}

// Props for the UserProfile component
export interface UserProfileProps {
  userId: string;
}

// Props for the VibeCheckButton component
export interface VibeCheckButtonProps {
  targetId: string;
  targetType: 'project' | 'review' | 'community' | 'news' | 'comment' | 'gear' | 'tool_review';
  initialCount?: number;
}

// Props for the VibeFlowBackground component
export interface VibeFlowBackgroundProps {
  children: React.ReactNode;
}

// Props for the Comment component
export interface CommentProps {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  authorId: string;
  targetId: string;
  postType: 'project' | 'review' | 'community' | 'news' | 'tool_review'; // Different types of posts
  onReply?: (commentId: string) => void;
  currentUserId?: string;
}

// Interface for a comment item
export interface CommentItem {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  target_id: string;
  parent_id: string | null;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

// Props for the CommentSection component
export interface CommentSectionProps {
  targetId: string;
  postType: 'project' | 'review' | 'community' | 'news' | 'tool_review'; // Type of the target
}

// Interface for nav items
export interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
}