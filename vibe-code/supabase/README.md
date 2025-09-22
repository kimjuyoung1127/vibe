# Vibe Code Supabase Database Schema

This document describes the database schema for the Vibe Code application, which uses Supabase as its backend.

## Overview

The Vibe Code application requires several data entities to support its features:

1. User profiles and authentication
2. Project showcases
3. Comments on projects
4. Community posts
5. News articles
6. Vibe check interactions
7. Project features and technology stack
8. User statistics

## Database Schema

### Users Table

Stores user profile information.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Projects Table

Stores information about projects showcased in the application.

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    deployment_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Comments Table

Stores comments made on projects.

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Community Posts Table

Stores posts in the community section.

```sql
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[],
    comment_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### News Articles Table

Stores news articles displayed in the news section.

```sql
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(255),
    image_url TEXT,
    read_time VARCHAR(50),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Vibe Checks Table

Stores "vibe check" interactions (likes) on projects.

```sql
CREATE TABLE vibe_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Project Features Table

Stores features associated with projects.

```sql
CREATE TABLE project_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    feature_name VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Technology Stack Table

Stores technology stack information for projects.

```sql
CREATE TABLE technology_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    technology_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User Stats Table

Stores statistics for users.

```sql
CREATE TABLE user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    projects_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    vibe_checks_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS) Policies

RLS policies are implemented to ensure data security and privacy:

- Users can view their own profile
- Users can update their own profile
- Everyone can view projects
- Authenticated users can create projects
- Users can update/delete their own projects
- Everyone can view comments
- Authenticated users can create comments
- Users can update/delete their own comments
- Everyone can view community posts
- Authenticated users can create community posts
- Users can update/delete their own community posts
- Everyone can view news articles
- Everyone can view vibe checks
- Authenticated users can create vibe checks
- Users can delete their own vibe checks

## Triggers and Functions

Several triggers and functions are implemented to maintain data consistency:

1. Timestamp updates: Automatically update the `updated_at` field when records are modified
2. User statistics: Automatically update user statistics when projects, comments, or vibe checks are created or deleted

## Indexes

Indexes are created on foreign key columns to improve query performance:

- `idx_users_username` on `users(username)`
- `idx_projects_user_id` on `projects(user_id)`
- `idx_comments_project_id` on `comments(project_id)`
- `idx_comments_user_id` on `comments(user_id)`
- `idx_community_posts_user_id` on `community_posts(user_id)`
- `idx_news_articles_category` on `news_articles(category)`
- `idx_vibe_checks_user_id` on `vibe_checks(user_id)`
- `idx_vibe_checks_project_id` on `vibe_checks(project_id)`
- `idx_vibe_checks_user_project` unique index to prevent duplicate vibe checks
- `idx_project_features_project_id` on `project_features(project_id)`
- `idx_technology_stack_project_id` on `technology_stack(project_id)`