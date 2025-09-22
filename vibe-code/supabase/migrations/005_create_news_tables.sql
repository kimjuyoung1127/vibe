-- Create news_articles table
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES user_profiles(user_id),
    title TEXT NOT NULL,
    summary TEXT,
    hero_image_url TEXT,
    content TEXT NOT NULL,
    source_name TEXT,
    source_url TEXT,
    crawled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE,
    is_published BOOLEAN DEFAULT FALSE,
    vibe_check_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_news_articles_published_at ON news_articles(published_at);
CREATE INDEX idx_news_articles_crawled_at ON news_articles(crawled_at);
CREATE INDEX idx_news_articles_admin_id ON news_articles(admin_id);

-- Set up Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for news_articles
CREATE POLICY "Everyone can view published news articles" 
ON news_articles FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admins can view all news articles" 
ON news_articles FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert news articles" 
ON news_articles FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update news articles" 
ON news_articles FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete news articles" 
ON news_articles FOR DELETE 
USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON news_articles TO authenticated;

-- Create news_categories table (N:M relationship)
CREATE TABLE news_categories (
    article_id UUID REFERENCES news_articles(id) ON DELETE CASCADE,
    category_name TEXT,
    PRIMARY KEY (article_id, category_name)
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_news_articles_updated_at 
    BEFORE UPDATE ON news_articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();