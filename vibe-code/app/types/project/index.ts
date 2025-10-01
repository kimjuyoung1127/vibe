// Project-related type definitions

// Props for the ProjectCard component
export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

// Interface for a project item based on the database schema
export interface ProjectItem {
  id: string; // UUID from database
  user_id: string; // UUID of the project creator
  title: string;
  tagline: string; // Use 'tagline' from database
  hero_image_url: string | null; // Use 'hero_image_url' from database
  content: string; // This is the detailed description
  github_url: string | null;
  live_demo_url: string | null;
  deployment_platform: string | null;
  font_preference: string;
  vibe_check_count: number;
  comment_count: number;
  is_public: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// Props for the Pagination component
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Props for the CoreInfoSection component
export interface CoreInfoSectionProps {
  title: string;
  setTitle: (title: string) => void;
  tagline: string;
  setTagline: (tagline: string) => void;
  heroImageUrl: string | null;
  setHeroImageUrl: (url: string | null) => void;
  errors: Record<string, string>;
}

// Props for the DescriptionSection component
export interface DescriptionSectionProps {
  description: string;
  setDescription: (description: string) => void;
  errors: Record<string, string>;
  fontPreference: string;
  setFontPreference: (font: string) => void;
}

// Props for the CategorizationSection component
export interface CategorizationSectionProps {
  features: string; // Comma-separated string for custom features
  setFeatures: (features: string) => void;
  techStack: string; // Comma-separated string
  setTechStack: (techStack: string) => void;
  devTools: string; // Comma-separated string
  setDevTools: (devTools: string) => void;
  categoryTags: string; // Comma-separated string
  setCategoryTags: (categoryTags: string) => void;
}

// Props for the LinksSection component
export interface LinksSectionProps {
  githubUrl: string;
  setGithubUrl: (url: string) => void;
  liveDemoUrl: string;
  setLiveDemoUrl: (url: string) => void;
  deploymentPlatform: string;
  setDeploymentPlatform: (platform: string) => void;
}

// Props for the StatusSection component
export interface StatusSectionProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  isSubmitting: boolean;
  onSaveDraft: () => Promise<void>;
  saveDraftStatus: 'idle' | 'saving' | 'saved' | 'error';
}

// Interface for project images
export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string | null;
  created_at: string;
}

// Interface for project features
export interface ProjectFeature {
  id: string;
  project_id: string;
  feature_text: string;
  order_index: number | null;
}

// Interface for project technologies
export interface ProjectTechnology {
  project_id: string;
  tech_name: string;
}

// Interface for project tools
export interface ProjectTool {
  project_id: string;
  tool_name: string;
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

// Interface for related projects
export interface RelatedProject {
  id: string;
  title: string;
  tagline: string;
  hero_image_url: string | null;
}

// Interface for projects displayed in the showcase list
export interface ProjectShowcaseItem {
  id: string;
  title: string;
  tagline: string;
  hero_image_url: string | null;
  created_at: string;
}