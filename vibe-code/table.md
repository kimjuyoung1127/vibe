# Vibe Hub Database Schema

## Tables

### profiles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users(id) |
| role | TEXT | User's role ('user', 'moderator', 'admin') |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### reports
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default gen_random_uuid() |
| reporter_user_id | UUID | Foreign key referencing auth.users(id), report submitter |
| target_id | UUID | ID of the content being reported |
| target_type | TEXT | Type of content ('project', 'comment', 'community_post', 'tool_review') |
| reason | TEXT | Reason for report ('inappropriate_content', 'harassment', 'spam', 'misinformation', 'other') |
| description | TEXT | Optional detailed explanation |
| status | TEXT | Report status ('pending', 'reviewed', 'resolved', 'dismissed') |
| created_at | TIMESTAMP WITH TIME ZONE | Report creation timestamp |
| reviewed_at | TIMESTAMP WITH TIME ZONE | Timestamp when report was reviewed |
| reviewed_by | UUID | Foreign key referencing auth.users(id), moderator who reviewed |

### tool_reviews
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default gen_random_uuid() |
| user_id | UUID | Foreign key referencing auth.users(id), CASCADE delete |
| title | VARCHAR(255) | Review title |
| tool_tech_name | VARCHAR(255) | Name of the tool/tech being reviewed |
| overall_rating | INTEGER | Rating from 1-5 |
| one_liner_pros | TEXT | Brief pros description |
| one_liner_cons | TEXT | Brief cons description |
| content | TEXT | Full review content |
| hero_image_url | TEXT | URL to hero image |
| demo_video_url | TEXT | URL to demo video |
| font_preference | VARCHAR(50) | Preferred font ('retro' by default) |
| vibe_check_count | INTEGER | Number of vibe checks |
| comment_count | INTEGER | Number of comments |
| report_count | INTEGER | Number of reports against this review |
| is_public | BOOLEAN | Whether the review is public |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### projects
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing auth.users(id), CASCADE delete |
| title | VARCHAR(255) | Project title |
| description | TEXT | Project description |
| image_url | TEXT | URL to project image |
| github_url | TEXT | Project's GitHub URL |
| live_demo_url | TEXT | URL to live demo |
| deployment_info | TEXT | Deployment information |
| report_count | INTEGER | Number of reports against this project |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### comments
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| user_id | UUID | Foreign key referencing auth.users(id), CASCADE delete |
| content | TEXT | Comment content |
| report_count | INTEGER | Number of reports against this comment |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### community_posts
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing auth.users(id), CASCADE delete |
| title | VARCHAR(255) | Post title |
| content | TEXT | Post content |
| tags | TEXT[] | Array of tags |
| comment_count | INTEGER | Number of comments |
| likes_count | INTEGER | Number of likes |
| report_count | INTEGER | Number of reports against this post |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### news_articles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| category | VARCHAR(255) | Article category |
| title | VARCHAR(255) | Article title |
| excerpt | TEXT | Article excerpt |
| content | TEXT | Full article content |
| author | VARCHAR(255) | Article author |
| image_url | TEXT | URL to article image |
| read_time | VARCHAR(50) | Estimated read time |
| published_at | TIMESTAMP WITH TIME ZONE | Publishing timestamp |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### vibe_checks
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing auth.users(id), CASCADE delete |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### project_features
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| feature_name | VARCHAR(255) | Name of the feature |
| is_completed | BOOLEAN | Whether the feature is completed |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### technology_stack
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| technology_name | VARCHAR(255) | Name of the technology |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### user_stats
| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID | Primary key, foreign key referencing auth.users(id), CASCADE delete |
| projects_count | INTEGER | Number of projects created |
| comments_count | INTEGER | Number of comments made |
| vibe_checks_count | INTEGER | Number of vibe checks given |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

## Database Functions

### submit_report
| Parameter | Type | Description |
|-----------|------|-------------|
| p_target_id | UUID | ID of the content being reported |
| p_target_type | TEXT | Type of content being reported |
| p_reason | TEXT | Reason for the report |
| p_description | TEXT | Optional description |

## Database Triggers

### update_content_report_count
- Automatically updates report counts when reports are added or removed
- Updates report counts on projects, comments, community_posts, and tool_reviews tables

### projects
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing users(id), CASCADE delete |
| title | VARCHAR(255) | Project title |
| description | TEXT | Project description |
| image_url | TEXT | URL to project image |
| github_url | TEXT | Project's GitHub URL |
| live_demo_url | TEXT | URL to live demo |
| deployment_info | TEXT | Deployment information |
| report_count | INTEGER | Number of reports against this project |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### comments
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| user_id | UUID | Foreign key referencing users(id), CASCADE delete |
| content | TEXT | Comment content |
| report_count | INTEGER | Number of reports against this comment |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### community_posts
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing users(id), CASCADE delete |
| title | VARCHAR(255) | Post title |
| content | TEXT | Post content |
| tags | TEXT[] | Array of tags |
| comment_count | INTEGER | Number of comments |
| likes_count | INTEGER | Number of likes |
| report_count | INTEGER | Number of reports against this post |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### news_articles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| category | VARCHAR(255) | Article category |
| title | VARCHAR(255) | Article title |
| excerpt | TEXT | Article excerpt |
| content | TEXT | Full article content |
| author | VARCHAR(255) | Article author |
| image_url | TEXT | URL to article image |
| read_time | VARCHAR(50) | Estimated read time |
| published_at | TIMESTAMP WITH TIME ZONE | Publishing timestamp |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### vibe_checks
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| user_id | UUID | Foreign key referencing users(id), CASCADE delete |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### project_features
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| feature_name | VARCHAR(255) | Name of the feature |
| is_completed | BOOLEAN | Whether the feature is completed |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### technology_stack
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default uuid_generate_v4() |
| project_id | UUID | Foreign key referencing projects(id), CASCADE delete |
| technology_name | VARCHAR(255) | Name of the technology |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |

### user_stats
| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID | Primary key, foreign key referencing users(id), CASCADE delete |
| projects_count | INTEGER | Number of projects created |
| comments_count | INTEGER | Number of comments made |
| vibe_checks_count | INTEGER | Number of vibe checks given |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |

### reports (Newly Added)
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default gen_random_uuid() |
| reporter_user_id | UUID | Foreign key referencing auth.users(id), report submitter |
| target_id | UUID | ID of the content being reported |
| target_type | TEXT | Type of content ('project', 'comment', 'community_post', 'tool_review') |
| reason | TEXT | Reason for report ('inappropriate_content', 'harassment', 'spam', 'misinformation', 'other') |
| description | TEXT | Optional detailed explanation |
| status | TEXT | Report status ('pending', 'reviewed', 'resolved', 'dismissed') |
| created_at | TIMESTAMP WITH TIME ZONE | Report creation timestamp |
| reviewed_at | TIMESTAMP WITH TIME ZONE | Timestamp when report was reviewed |
| reviewed_by | UUID | Foreign key referencing auth.users(id), moderator who reviewed |

### tool_reviews (Newly Added)
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, default gen_random_uuid() |
| user_id | UUID | Foreign key referencing users(id), CASCADE delete |
| title | VARCHAR(255) | Review title |
| tool_tech_name | VARCHAR(255) | Name of the tool/tech being reviewed |
| overall_rating | INTEGER | Rating from 1-5 |
| one_liner_pros | TEXT | Brief pros description |
| one_liner_cons | TEXT | Brief cons description |
| content | TEXT | Full review content |
| hero_image_url | TEXT | URL to hero image |
| demo_video_url | TEXT | URL to demo video |
| font_preference | VARCHAR(50) | Preferred font ('retro' by default) |
| vibe_check_count | INTEGER | Number of vibe checks |
| comment_count | INTEGER | Number of comments |
| report_count | INTEGER | Number of reports against this review |
| is_public | BOOLEAN | Whether the review is public |
| created_at | TIMESTAMP WITH TIME ZONE | Record creation timestamp |
| updated_at | TIMESTAMP WITH TIME ZONE | Record update timestamp |