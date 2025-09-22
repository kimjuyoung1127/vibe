-- Create projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    github_url TEXT,
    live_demo_url TEXT,
    deployment_platform TEXT,
    font_preference TEXT DEFAULT 'Modern Sans-serif',
    vibe_check_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_vibe_check_count ON projects(vibe_check_count);

-- Set up Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Everyone can view public projects" 
ON projects FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view their own projects" 
ON projects FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own projects" 
ON projects FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own projects" 
ON projects FOR UPDATE 
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own projects" 
ON projects FOR DELETE 
USING (user_id = auth.uid());

-- Grant permissions
GRANT ALL ON projects TO authenticated;

-- Create project_categories table (N:M relationship)
CREATE TABLE project_categories (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    category_name TEXT,
    PRIMARY KEY (project_id, category_name)
);

-- Create project_features table
CREATE TABLE project_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    feature_text TEXT NOT NULL,
    order_index INTEGER
);

-- Create indexes for better query performance
CREATE INDEX idx_project_features_project_id ON project_features(project_id);

-- Set up Row Level Security (RLS)
ALTER TABLE project_features ENABLE ROW LEVEL SECURITY;

-- Create policies for project_features
CREATE POLICY "Everyone can view project features" 
ON project_features FOR SELECT 
USING (true);

CREATE POLICY "Users can manage features for their own projects" 
ON project_features FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM projects 
        WHERE projects.id = project_features.project_id 
        AND projects.user_id = auth.uid()
    )
);

-- Grant permissions
GRANT ALL ON project_features TO authenticated;

-- Create project_technologies table (N:M relationship)
CREATE TABLE project_technologies (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tech_name TEXT,
    PRIMARY KEY (project_id, tech_name)
);

-- Create project_tools table (N:M relationship)
CREATE TABLE project_tools (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tool_name TEXT,
    PRIMARY KEY (project_id, tool_name)
);

-- Create a trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();