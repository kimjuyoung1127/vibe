// Gear/Tool & Tech Review related type definitions

// Props for the ToolTechReviewCard component
export interface ReviewCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  rating: number;
  imageUrl: string;
}

// Interface for a tool/tech review
export interface ToolReview {
  id: string;
  title: string;
  tool_tech_name: string;
  overall_rating: number;
  content: string;
  hero_image_url: string;
  created_at: string;
  user_profiles: {
    display_name: string;
  }[] | null;
}

// Props for the CoreInfoSection component
export interface CoreInfoSectionProps {
  formData: {
    title: string;
    toolTechName: string;
    overallRating: number;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    toolTechName: string;
    overallRating: number;
    oneLinerPros: string;
    oneLinerCons: string;
    content: string;
    heroImageUrl: string;
    demoVideoUrl: string;
    fontPreference: string;
    categoryTags: string;
  }>>;
}

// Props for the CategorizationSection component
export interface CategorizationSectionProps {
  formData: {
    category: string | number | readonly string[] | undefined;
    categoryTags: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

// Props for the DetailedReviewSection component
export interface DetailedReviewSectionProps {
  formData: {
    content: string;
    fontPreference: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    toolTechName: string;
    overallRating: number;
    oneLinerPros: string;
    oneLinerCons: string;
    content: string;
    heroImageUrl: string;
    demoVideoUrl: string;
    fontPreference: string;
    categoryTags: string;
  }>>;
}

// Props for the MediaSection component
export interface MediaSectionProps {
  formData: {
    heroImageUrl: string;
    demoVideoUrl: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    toolTechName: string;
    overallRating: number;
    oneLinerPros: string;
    oneLinerCons: string;
    content: string;
    heroImageUrl: string;
    demoVideoUrl: string;
    fontPreference: string;
    categoryTags: string;
  }>>;
}

// Props for the ActionButtons component
export interface ActionButtonsProps {
  loading: boolean;
  formData: {
    title: string;
    toolTechName: string;
    overallRating: number;
    oneLinerPros: string;
    oneLinerCons: string;
    content: string;
    heroImageUrl: string;
    demoVideoUrl: string;
    fontPreference: string;
    categoryTags: string;
  };
  isEditing?: boolean;
  reviewId?: string;
}

// Interface for review data in the detail view
export interface ReviewData {
  id: string;
  title: string;
  tool_tech_name: string;
  overall_rating: number;
  content: string;
  hero_image_url: string | null;
  demo_video_url: string | null;
  font_preference: string;
  vibe_check_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  author_name: string;
  author_username: string;
  author_avatar_url: string | null;
  categories: string[];
}

// Interface for author profile data
export interface AuthorProfileData {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  website_url: string;
  created_at: string;
}

// Props for the AuthorInfo component
export interface AuthorInfoProps {
  author: string;
  authorRole: string;
  publishDate: string;
  lastUpdated: string;
  readTime: string;
  authorImageUrl: string;
  initialLikes: number;
  onLike: () => void;
  isLiked: boolean;
  reviewId?: string;
  authorId?: string;
  contentType?: 'project' | 'comment' | 'tool_review' | 'community_post';
  onReportClick?: () => void;
}