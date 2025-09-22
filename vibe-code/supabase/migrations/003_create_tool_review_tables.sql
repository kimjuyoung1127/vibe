-- Create tool_reviews table
CREATE TABLE tool_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tool_tech_name TEXT NOT NULL,
    overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    one_liner_pros TEXT,
    one_liner_cons TEXT,
    content TEXT NOT NULL,
    hero_image_url TEXT,
    demo_video_url TEXT,
    font_preference TEXT DEFAULT 'Modern Sans-serif',
    vibe_check_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_tool_reviews_user_id ON tool_reviews(user_id);
CREATE INDEX idx_tool_reviews_tool_tech_name ON tool_reviews(tool_tech_name);
CREATE INDEX idx_tool_reviews_overall_rating ON tool_reviews(overall_rating);
CREATE INDEX idx_tool_reviews_created_at ON tool_reviews(created_at);

-- Set up Row Level Security (RLS)
ALTER TABLE tool_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for tool_reviews
CREATE POLICY "Everyone can view tool reviews" 
ON tool_reviews FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own tool reviews" 
ON tool_reviews FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own tool reviews" 
ON tool_reviews FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own tool reviews" 
ON tool_reviews FOR DELETE 
USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON tool_reviews TO authenticated;

-- Create review_categories table (N:M relationship)
CREATE TABLE review_categories (
    review_id UUID REFERENCES tool_reviews(id) ON DELETE CASCADE,
    category_name TEXT,
    PRIMARY KEY (review_id, category_name)
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_tool_reviews_updated_at 
    BEFORE UPDATE ON tool_reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();