-- Create comments table (unified for all post types)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type TEXT NOT NULL CHECK (post_type IN ('project', 'review', 'community', 'news')),
    post_id UUID NOT NULL,
    vibe_check_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_post_type ON comments(post_type);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Set up Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
CREATE POLICY "Everyone can view comments" 
ON comments FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create comments" 
ON comments FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own comments" 
ON comments FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" 
ON comments FOR DELETE 
USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON comments TO authenticated;

-- Create vibe_checks table (unified for all target types)
CREATE TABLE vibe_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    target_type TEXT NOT NULL CHECK (target_type IN ('project', 'review', 'community', 'news', 'comment')),
    target_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_vibe_checks_user_id ON vibe_checks(user_id);
CREATE INDEX idx_vibe_checks_target_id ON vibe_checks(target_id);
CREATE INDEX idx_vibe_checks_target_type ON vibe_checks(target_type);

-- Ensure a user can only vibe check a target once
CREATE UNIQUE INDEX idx_vibe_checks_user_target ON vibe_checks(user_id, target_type, target_id);

-- Set up Row Level Security (RLS)
ALTER TABLE vibe_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for vibe_checks
CREATE POLICY "Everyone can view vibe checks" 
ON vibe_checks FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create vibe checks" 
ON vibe_checks FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own vibe checks" 
ON vibe_checks FOR DELETE 
USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON vibe_checks TO authenticated;

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();