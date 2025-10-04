// types.ts
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  source_name: string;
  source_url: string;
  crawled_at: string;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  admin_id: string | null;
  hero_image_url: string | null;
  vibe_check_count: number;
  comment_count: number;
}