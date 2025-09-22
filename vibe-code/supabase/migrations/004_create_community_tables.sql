-- Create community_posts table
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_urls TEXT[],
    font_preference TEXT DEFAULT 'Modern Sans-serif',
    vibe_check_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at);

-- Set up Row Level Security (RLS)
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for community_posts
CREATE POLICY "Everyone can view community posts" 
ON community_posts FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own community posts" 
ON community_posts FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own community posts" 
ON community_posts FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own community posts" 
ON community_posts FOR DELETE 
USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON community_posts TO authenticated;

-- Create community_post_tags table (N:M relationship)
CREATE TABLE community_post_tags (
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    tag_name TEXT,
    PRIMARY KEY (post_id, tag_name)
);

-- Create community_polls table (optional - for poll functionality)
CREATE TABLE community_polls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID UNIQUE REFERENCES community_posts(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community_poll_options table
CREATE TABLE community_poll_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    poll_id UUID REFERENCES community_polls(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    vote_count INTEGER DEFAULT 0
);

-- Create community_poll_votes table
CREATE TABLE community_poll_votes (
    poll_option_id UUID REFERENCES community_poll_options(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (poll_option_id, user_id)
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_community_posts_updated_at 
    BEFORE UPDATE ON community_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();