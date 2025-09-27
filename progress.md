# Vibe Code Project - Progress Report

## Project Overview
This document tracks the progress of the Vibe Code website implementation, a community platform for developers who value the "vibe" and environment of coding, featuring a modern retro pop art style.

## Completed Tasks

### 1. Project Setup and Initial Structure
- [x] Created project directory structure
- [x] Set up Next.js project with TypeScript
- [x] Configured Tailwind CSS with custom theme
- [x] Added necessary dependencies

### 2. Navigation Components
- [x] Created TopNav component with responsive design
  - Desktop navigation with search and user controls
  - Mobile hamburger menu with overlay functionality
- [x] Created Navbar component with sidebar navigation
  - Reddit-style sidebar with expand/collapse functionality
  - User profile section
  - Navigation links for all main sections

### 3. Main Page Modularization
- [x] Created mainpage directory for organizing page components
- [x] Extracted Hero Section into HeroSection.tsx component
- [x] Extracted Weekly Vibe Ranking into WeeklyVibeRanking.tsx component
- [x] Extracted Latest Projects into LatestProjects.tsx component
- [x] Extracted Vibe News into VibeNews.tsx component
- [x] Updated main page (page.tsx) to use modularized components
- [x] Added detailed comments to all components for better readability
- [x] Fixed import paths for proper component linking

### 4. Projects Page Implementation
- [x] Created projects directory for organizing projects page components
- [x] Implemented projects page (page.tsx) using global navigation components
- [x] Created ProjectsShowcase component for main content
- [x] Created SearchAndFilter component for project filtering
- [x] Created ProjectCard component for displaying individual projects
- [x] Created Pagination component for navigating between project pages
- [x] Ensured proper integration with global navigation
- [x] Removed hardcoded navigation components to avoid duplication

### 5. Project Card Page Implementation
- [x] Created dynamic route for individual project cards using Next.js dynamic routes
- [x] Implemented ProjectShowcaseDetail component with all content sections
- [x] Created FeatureList component with interactive checkboxes
- [x] Implemented TechnologyStack component for displaying tools and technologies
- [x] Created RelatedProjects component for showcasing related projects
- [x] Implemented CommentsSection component with form and existing comments
- [x] Updated ProjectsShowcase to link to individual project detail page
- [x] Ensured proper integration with global navigation
- [x] Implemented database integration to fetch and display project details
- [x] Added loading and error states for project detail data fetching
- [x] Implemented project card click navigation to project detail page
- [x] Implemented database integration for FeatureList to fetch features from project_features table
- [x] Implemented database integration for TechnologyStack to fetch tech stack from project_technologies table
- [x] Implemented database integration for TechnologyStack to fetch tools from project_tools table
- [x] Implemented database integration for RelatedProjects to fetch related projects (placeholder)

### 6. Project Create Page Implementation
- [x] Created project create directory for organizing project creation components
- [x] Implemented project create page (page.tsx) with global navigation components
- [x] Created ProjectCreateForm component with all form sections
- [x] Implemented core information section with title and hero image fields
- [x] Created detailed description section with markdown support
- [x] Implemented categorization and specifications section
- [x] Created project links section
- [x] Implemented status and actions section with visibility toggle
- [x] Added form validation and submission handling
- [x] Updated ProjectsShowcase to link to the create project page
- [x] Updated NewProjectButton to navigate to the create project page
- [x] Implemented database integration to save project data
- [x] Added loading and error states for project creation
- [x] Implemented redirection to project detail page after successful creation
- [x] Implemented saving of related data (features, technologies, tools, categories) to separate tables
- [x] Implemented saving of project features to project_features table
- [x] Implemented saving of technology stack to project_technologies table
- [x] Implemented saving of development tools to project_tools table
- [x] Implemented saving of category tags to project_categories table
- [x] Implemented database integration for FeatureList to save features to project_features table
- [x] Implemented database integration for TechnologyStack to save tech stack to project_technologies table
- [x] Implemented database integration for TechnologyStack to save tools to project_tools table
- [x] Implemented database integration for CategorizationSection to save category tags to project_categories table

### 7. Styling and UI Implementation
- [x] Implemented modern retro pop art theme
- [x] Added custom color palette with primary blue and light backgrounds
- [x] Integrated Google Fonts (Space Grotesk for headings)
- [x] Added Material Symbols for icons
- [x] Implemented responsive design for all screen sizes
- [x] Added glassmorphism effects and bold shadows
- [x] Implemented Korean language support throughout the application

### 8. Tool & Tech Review Page Implementation
- [x] Created gear directory for organizing tool & tech review components
- [x] Implemented main tool & tech review page (page.tsx)
- [x] Created ToolTechHeader component for page header
- [x] Created ToolTechReviews component for displaying review grid
- [x] Created ToolTechReviewCard component for individual reviews
- [x] Implemented dynamic routing for individual review details
- [x] Created modular components for review detail page:
  - BackButton.tsx
  - Header.tsx
  - AuthorInfo.tsx
  - ReviewImage.tsx
  - ReviewContent.tsx
  - Tags.tsx
  - CommentsSection.tsx
- [x] Added NewReviewButton component for creating new reviews
- [x] Ensured proper integration with global navigation

### 9. Community (Coding Lounge) Page Implementation
- [x] Created community directory for organizing community components
- [x] Implemented main community page with feed format (page.tsx)
- [x] Created CommunityHeader component for page header
- [x] Created CommunityPosts component with infinite scroll
- [x] Implemented simplified post display without detail navigation
- [x] Created community post creation page (/community/create)
- [x] Reused project creation UI patterns for community post creation
- [x] Created CommunityPostForm component with adapted fields
- [x] Added NewPostButton component for creating new posts
- [x] Added proper navigation between community posts and detail pages
- [x] Ensured proper integration with global navigation

### 10. News Page Implementation
- [x] Created news directory for organizing news components
- [x] Implemented main news page with article grid (page.tsx)
- [x] Created NewsHeader component for page header
- [x] Created NewsArticles component for displaying article grid
- [x] Created NewsArticleCard component for individual articles
- [x] Implemented dynamic routing for individual article details
- [x] Created modular components for article detail page:
  - ExploreMoreSection.tsx (source links and sharing)
  - RelatedNewsSection.tsx (related articles)
  - RelatedNewsCard.tsx (individual related articles)
- [x] Added copy functionality for source URLs
- [x] Implemented social sharing options
- [x] Ensured proper integration with global navigation

### 11. User Profile Implementation
- [x] Created user profile directory for organizing profile components
- [x] Implemented main profile page (page.tsx) with user information display
- [x] Created UserProfile component for displaying user details
- [x] Implemented profile editing page (/profile/edit) with comprehensive form
- [x] Created modular components for profile editing:
  - BasicInfoEditor.tsx (avatar upload, username, display name, bio)
  - SocialLinksEditor.tsx (social media links with add/remove functionality)
  - AccountSettingsEditor.tsx (email, connected accounts, notifications, language)
- [x] Added profile button to TopNav component with consistent styling
- [x] Componentized search functionality into SearchBar.tsx
- [x] Componentized user profile section in sidebar into UserProfile.tsx
- [x] Ensured consistent profile functionality across TopNav and sidebar
- [x] Added responsive design for profile components
- [x] Implemented proper routing between profile and edit pages
- [x] Implemented database integration for user profile data

### 12. UI/UX Improvements and Refinements
- [x] Adjusted profile button size in TopNav to match search bar height
- [x] Fixed Projects icon in navigation to use available Material Symbol
- [x] Repositioned "New Project" button in ProjectsShowcase page
- [x] Added proper spacing and padding between UI elements
- [x] Improved visual consistency across navigation components
- [x] Enhanced accessibility with proper ARIA attributes and screen reader text
- [x] Implemented database integration for all data fetching and saving
- [x] Added loading and error states for all asynchronous operations
- [x] Implemented proper form validation and user feedback
- [x] Implemented responsive design for all screen sizes

### 13. Database Integration and Data Management
- [x] Set up Supabase database with the designed schema
- [x] Implemented database migrations for schema updates
- [x] Integrated Supabase data with frontend components
- [x] Implemented real-time features using Supabase Realtime (where applicable)
- [x] Added file upload functionality using Supabase Storage (where applicable)
- [x] Implemented role-based access control for admin features
- [x] Added unit and integration tests for database operations
- [x] Optimized database queries for performance
- [x] Set up monitoring and logging for database operations
- [x] Implemented proper error handling and user feedback for database operations
- [x] Implemented data validation and sanitization for all inputs
- [x] Implemented proper data relationships and foreign key constraints
- [x] Implemented database transactions where necessary for data consistency

### 14. Enhanced Search and Filter Functionality
- [x] Improved SearchAndFilter component with expanded category options
- [x] Added sorting options including VibeCheck count and algorithmic recommendations
- [x] Expanded tools filter options using suggestionutils data
- [x] Added Tech Stack filter dropdown
- [x] Implemented enhanced search functionality

### 15. Author Profile Component Implementation
- [x] Created new AuthorProfile component for project showcase detail
- [x] Implemented data fetching for author profile and stats from Supabase
- [x] Designed UI to match existing UserProfile component
- [x] Added navigation to user's profile page when avatar is clicked
- [x] Included social links and author information

### 16. Related Projects Enhancement
- [x] Replaced mockup data with real Supabase data fetching
- [x] Implemented logic to display other projects by the same author
- [x] Added conditional rendering when no related projects exist
- [x] Implemented proper loading and error states

### 17. Tool & Tech Review Creation System
- [x] Created gear/create directory for review creation
- [x] Implemented ToolTechReviewForm with proper form structure
- [x] Created modularized components for the form:
  - CoreInfoSection
  - CategorizationSection
  - QuickProsConsSection
  - DetailedReviewSection
  - MediaSection
  - ActionButtons
- [x] Implemented Supabase integration for data saving
- [x] Added image upload functionality to Supabase storage

### 18. Tool & Tech Review Detail Page Enhancement
- [x] Replaced mockup data with real Supabase data fetching
- [x] Implemented proper loading and error states
- [x] Added rating display with visual star representation
- [x] Added one-liner pros/cons display
- [x] Implemented proper author information display

### 19. Gear Media Upload Component
- [x] Created GearMediaUpload component for image and YouTube URL uploads
- [x] Implemented image upload to Supabase storage
- [x] Added YouTube URL input with thumbnail preview
- [x] Implemented validation for URL and thumbnail display

### 20. Draft Functionality Implementation
- [x] Created gear/drafts page similar to projects/drafts
- [x] Implemented save draft functionality in ActionButtons
- [x] Added success/error feedback for draft saves
- [x] Updated UserProfile to include tool & tech count with navigation to drafts
- [x] Made gear draft cards match the style of project draft cards

### 21. Rating Display Enhancement
- [x] Added visual star rating display on tool/tech review detail page
- [x] Added one-liner pros/cons display on review detail page
- [x] Adjusted sizing of rating and pros/cons elements to content
- [x] Added proper spacing between sections

### 22. Enhanced Project Management System
- [x] Created comprehensive project management page for users
- [x] Implemented tabbed interface for All Projects, Drafts, and Published projects
- [x] Added ability to edit both drafts and published projects
- [x] Implemented publish/unpublish functionality for projects
- [x] Added project deletion capability for drafts
- [x] Created intuitive UI with action buttons based on project status
- [x] Added visual indicators for draft projects
- [x] Implemented confirmation dialogs for all destructive actions
- [x] Enhanced error handling for missing related data in projects
- [x] Improved ProjectCreateForm to handle editing of published projects
- [x] Added graceful handling of missing related data (features, tech stack, etc.)
- [x] Updated navigation to include "My Projects" management page
- [x] Made projects count in user profile clickable to access management page

### 23. Community Post Creation and Management System
- [x] Implemented database integration for community posts with Supabase
- [x] Created modular components for community posts (PostItem, EditPostModal)
- [x] Added character limit to content field in post creation form (500 characters)
- [x] Implemented proper redirect to community page after successful post creation
- [x] Added edit functionality for users to modify their own posts
- [x] Added delete functionality for users to remove their own posts with confirmation
- [x] Fixed duplicate post display issue in community feed
- [x] Created utility functions for community post tags in suggestion utils
- [x] Implemented proper Supabase integration for CRUD operations
- [x] Added proper error handling for database operations
- [x] Implemented export functionality for community modules
- [x] Added multiselect button group for tag selection using suggestion utils

### 24. News Page Admin Dashboard Implementation
- [x] Created admin dashboard interface for managing news articles
- [x] Developed article listing component with publish/unpublish functionality
- [x] Implemented article editing interface with full content management
- [x] Created process page for triggering AI-powered news curation
- [x] Modularized admin components for maintainability (ArticleList, AdminHeader, QuickActions, etc.)
- [x] Integrated with centralized Supabase client for database operations
- [x] Implemented proper authentication and authorization checks
- [x] Added quick action buttons for common admin tasks
- [x] Created shared type definitions for news article interface
- [x] Implemented proper error handling and user feedback mechanisms
- [x] Designed UI consistent with existing application design language

### 25. News Article Display and Content Enhancement

#### 25.1 Connect Frontend to Database
- [x] Update NewsArticles component to fetch real data from Supabase instead of using mock data
- [x] Update NewsArticleCard to use real data and link to news detail pages
- [x] Connect NewsArticleDetail to fetch specific article from Supabase
- [x] Add proper loading and error states for all data fetching operations

#### 25.2 Content Rendering Improvements
- [x] Update NewsArticleDetail to use react-markdown with remark-gfm for better content rendering
- [x] Enhance markdown styling with proper visual hierarchy and readability
- [x] Improve heading separation, paragraph spacing, and list styling
- [x] Update excerpt display in article cards to properly render markdown content

#### 25.3 Image Upload Integration
- [x] Update ArticleEditor to use ImageUpload component for hero image instead of URL input
- [x] Configure ImageUpload to use 'news_images' bucket in Supabase
- [x] Create 'news_images' bucket in Supabase for storing article images

#### 25.4 Related News Functionality
- [x] Update RelatedNewsSection to fetch real related articles from Supabase
- [x] Implement logic to show articles from the same source as the current article
- [x] Add loading and error states for related news fetching
- [x] Update RelatedNewsCard to handle string IDs instead of numbers

#### 25.5 Pagination Improvements
- [x] Implement server-side pagination for news articles using Supabase range API
- [x] Add URL parameter support for pagination (page parameter)
- [x] Create intelligent page number display (showing max 5 page numbers)
- [x] Add smooth scrolling to top when changing pages
- [x] Handle edge cases like empty results and error states properly

#### 25.6 Content Processing Pipeline Optimization
- [x] Confirm manual content enhancement approach through admin UI
- [x] Verify that content enhancement avoids duplicate API calls to LLM
- [x] Ensure quality of content processing is maintained with manual editing approach

### 26. Main Page Supabase Integration

#### Phase 1: Data Model Preparation (Week 1)
- [x] Review and finalize the database schema for the mainpage components
- [x] Ensure proper relationships between data tables (projects, news articles, user stats)
- [x] Set up Row Level Security (RLS) policies for the mainpage data
- [x] Create any necessary database views or functions for efficient data retrieval

#### Phase 2: API Layer Development (Week 1-2)
- [x] Create API routes for fetching weekly vibe ranking data from Supabase
- [x] Create API routes for fetching latest projects data from Supabase
- [x] Create API routes for fetching vibe news data from Supabase
- [x] Implement proper error handling and caching for API responses

#### Phase 3: Component Refactoring - WeeklyVibeRanking (Week 2)
- [x] Update WeeklyVibeRanking component to fetch data from Supabase instead of using mock data
- [x] Implement proper loading states during data fetching
- [x] Add error handling and fallback UI for failed requests
- [x] Optimize data fetching with appropriate pagination or limiting

#### Phase 4: Component Refactoring - LatestProjects (Week 2)
- [x] Update LatestProjects component to fetch data from Supabase instead of using mock data
- [x] Implement proper loading states during data fetching
- [x] Add error handling and fallback UI for failed requests
- [x] Implement proper data transformation from Supabase response to component format

#### Phase 5: Component Refactoring - VibeNews (Week 3)
- [x] Update VibeNews component to fetch data from Supabase instead of using mock data
- [x] Implement proper loading states during data fetching
- [x] Add error handling and fallback UI for failed requests
- [x] Ensure compatibility with the news article format stored in Supabase

#### Phase 6: Performance Optimization (Week 3)
- [x] Implement caching strategies for mainpage data to reduce API calls
- [x] Optimize database queries for faster response times
- [x] Implement proper data fetching strategies (client vs server components)
- [x] Add proper error boundaries for each component

#### Phase 7: Testing and Validation (Week 3-4)
- [x] Test data fetching across all mainpage components
- [x] Validate proper error handling and loading states
- [x] Verify data consistency between different components
- [x] Perform performance testing to ensure optimal loading times
- [x] Test with different data scenarios (empty sets, large datasets, etc.)

#### Phase 8: UI/UX Refinements (Week 4)
- [x] Ensure consistent loading and error states across all components
- [x] Add skeleton loading UIs where appropriate
- [x] Optimize component rendering performance
- [x] Finalize any styling adjustments needed for real data

### 27. News Content Workflow Implementation

#### Phase 4: Content Workflow Implementation (Week 4-5)
- [x] Implement approval workflow for admin-reviewed articles
- [x] Add content scheduling functionality for timed publications
- [x] Create notification system for new articles requiring review
- [x] Implement article categorization and tagging system
- [x] Add content archival functionality for old articles

#### Phase 5: Advanced Features (Week 5-6)
- [x] Implement article personalization based on user interests
- [x] Add social sharing capabilities for published articles
- [x] Create newsletter generation from selected articles
- [x] Implement article recommendation system
- [x] Add advanced analytics and engagement tracking

#### Phase 6: Testing and Refinement (Week 6-7)
- [x] Test entire pipeline from RSS fetch to publication
- [x] Validate all legal compliance measures are working correctly
- [x] Optimize AI prompts to ensure quality of summaries and commentary
- [x] Performance test under various load conditions
- [x] User acceptance testing with internal team

### 28. Database Schema Updates and SQL Modifications

#### 28.1 Materialized View Index Enhancement
- [x] Added UNIQUE index for weekly_vibe_ranking materialized view to support CONCURRENTLY REFRESH
- [x] Dropped existing non-unique index and created new unique index on project_id
- [x] Updated SQL schema to ensure proper indexing for materialized view refresh operations

#### 28.2 Refresh Control and Throttling Implementation
- [x] Created refresh_control table to manage refresh timestamps and prevent excessive updates
- [x] Implemented throttling mechanism with 30-second interval to prevent too frequent refreshes
- [x] Added advisory locking to prevent concurrent refresh operations
- [x] Implemented exception handling to ensure locks are always released

#### 28.3 Concurrent Refresh Function Enhancement
- [x] Updated refresh_weekly_vibe_ranking function to use advisory locks for concurrency control
- [x] Added throttling logic to skip refresh if last refresh was within specified interval
- [x] Implemented proper error handling and lock cleanup in exception cases
- [x] Ensured function can safely handle concurrent calls without conflicts

## Current Status
The main page, projects page, individual project card pages, project create page, tool & tech review pages, community (coding lounge) pages, and news pages of the Vibe Code website have been successfully implemented with a modular component structure and full database integration.

Main page sections that are functional:
- Hero section with call-to-action
- Weekly Vibe Ranking display
- Latest Projects grid
- Vibe News articles

Projects page sections that are functional:
- Project showcase with grid layout
- Search and filtering capabilities with enhanced options
- Pagination controls
- Database integration for fetching and displaying projects

Project card page sections that are functional:
- Detailed project view with images and descriptions
- Interactive feature list with checkboxes
- Technology stack display
- Related projects section with real author projects
- Comments section with form and existing comments
- Database integration for fetching and displaying project details

Project create page sections that are functional:
- Core information section with title and hero image fields
- Detailed description section with markdown support
- Categorization and specifications section
- Project links section
- Status and actions section with visibility toggle
- Form validation and submission handling
- Database integration for saving project data and related information
- Redirection to project detail page after successful creation
- Saving of project features to project_features table
- Saving of technology stack to project_technologies table
- Saving of development tools to project_tools table
- Saving of category tags to project_categories table

Tool & Tech Review page sections that are functional:
- Review listing with grid layout from real database
- Individual review detail pages with real data from database
- Review creation functionality with draft support
- Rating display on detail pages
- One-liner pros/cons display
- Database integration for fetching and displaying reviews

Community (Coding Lounge) page sections that are functional:
- Feed format with infinite scroll
- Simplified post display without detail navigation
- Post creation page with adapted UI
- Database integration for fetching and displaying posts

News page sections that are functional:
- Article listing with grid layout
- Individual article detail pages
- Source link copying functionality
- Social sharing options
- Database integration for fetching and displaying news articles

The navigation system is fully responsive with both desktop sidebar and mobile hamburger menu implementations.

User profile sections that are functional:
- User information display
- Profile editing capabilities
- Avatar upload
- Social media links management
- Account settings management
- Database integration for fetching and saving user profile data

All components are properly integrated with the database, providing a seamless user experience with real-time data updates and proper error handling.

## Development Process & Guidelines

### Implementation Approach
1. **Component-Based Architecture**: All UI elements built as reusable, independent components following Atomic Design principles
2. **Modularization Strategy**: Components systematically classified by functionality and complexity
3. **Progressive Development**: Features implemented incrementally with thorough testing at each stage
4. **Code Reusability**: Global components (navigation) reused across pages to maintain consistency
5. **Database-First Approach**: All features implemented with full database integration from the start
6. **Error Handling and User Feedback**: Proper error handling and user feedback implemented for all operations
7. **Maintainability Focus**: Modularized components for easier future enhancements

### Coding Standards
- **TypeScript**: Strict typing for all components and interfaces
- **Component Structure**: Each component in its own file with clear naming conventions
- **Styling**: Tailwind CSS with custom theme configuration
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: Semantic HTML and proper ARIA attributes
- **Database Integration**: Proper use of Supabase client for all database operations
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance Optimization**: Optimized database queries and component rendering

### File Organization
- **Global Components**: `/app/components/` - Navigation and shared UI elements
- **Main Page**: `/app/mainpage/` - Homepage sections
- **Projects System**: `/app/projects/` - Projects listing, detail, and creation
- **Tool & Tech Reviews**: `/app/gear/` - Tool and technology reviews
- **Community**: `/app/community/` - Coding lounge and discussions
- **News**: `/app/news/` - Latest IT news articles
- **User Profile**: `/app/profile/` - User profile display and editing
- **Dynamic Routes**: Next.js dynamic routing for individual pages
- **Draft Management**: `/app/projects/drafts/` and `/app/gear/drafts/` for managing drafts

### UI/UX Implementation
- **Modern Retro Pop Art Theme**: Bright colors, bold elements, and vibrant accents
- **Visual Effects**: Glassmorphism, drop shadows, and interactive elements
- **Responsive Design**: Consistent experience across desktop, tablet, and mobile
- **User Feedback**: Interactive elements with hover and active states
- **Korean Language Support**: Full Korean language support throughout the application
- **Loading and Error States**: Proper loading and error states for all asynchronous operations
- **Form Validation**: Comprehensive form validation and user feedback
- **Consistent Card Styling**: Uniform card sizes and styling across project and gear sections

## Database Design Plan

### Security Considerations
To ensure the database is secure and not vulnerable, we will implement the following measures:

1. **Row Level Security (RLS)**:
   - Enable RLS on all tables
   - Define policies that restrict access to data based on user roles and ownership
   - Implement policies that allow users to only view/modify their own data

2. **Authentication**:
   - Use Supabase Auth for user authentication
   - Implement proper session management
   - Use JWT tokens for secure communication

3. **Data Validation**:
   - Implement constraints at the database level
   - Use check constraints for data integrity
   - Implement proper indexing for performance

4. **Access Control**:
   - Define roles and permissions for different types of users
   - Restrict direct database access
   - Use prepared statements to prevent SQL injection

5. **Encryption**:
   - Use SSL/TLS for data transmission
   - Store sensitive data encrypted at rest when necessary

### Database Implementation Order
We will create the tables in the following order to ensure proper data relationships:

1. **Users and Authentication Tables**:
   - users table (core user information)
   - user_profiles table (detailed user profile information)

2. **Projects Showcase Tables**:
   - projects table (project information)
   - project_categories table (categories of projects)
   - project_features table (features of projects)
   - project_technologies table (technologies used in projects)
   - project_tools table (tools used in projects)
   - comments table (comments on projects)

3. **Tool & Tech Review Tables**:
   - tool_reviews table (tool and technology reviews)
   - review_categories table (categories of reviews)

4. **Community (Coding Lounge) Tables**:
   - community_posts table (community posts)
   - community_post_tags table (tags for community posts)
   - community_polls table (optional - if polling feature is implemented)
   - community_poll_options table (options for community polls)
   - community_poll_votes table (votes for community polls)

5. **Vibe News Tables**:
   - news_articles table (news articles)
   - news_categories table (categories of news articles)

6. **Interaction and Statistics Tables**:
   - vibe_checks table (project likes/vibe checks)
   - user_stats table (user statistics)

7. **Main Page Aggregation Tables**:
   - weekly_vibe_ranking materialized view (for performance optimization)

### Detailed Table Designs

#### 1. Users and Authentication Tables
- users (Supabase auth.users 테이블과 연동)

id (UUID, PK): Supabase Auth에서 제공하는 사용자 ID. (FK for user_profiles.user_id)

email (TEXT): 사용자 이메일 (Supabase Auth에서 관리).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 사용자 생성 일시.

last_sign_in_at (TIMESTAMP WITH TIME ZONE): 마지막 로그인 일시.

Note: Supabase Auth는 내부적으로 auth.users 테이블을 관리하므로, 여기에 직접적인 테이블을 생성하기보다는 auth.users의 id를 user_profiles 테이블에서 참조하는 것이 일반적입니다.

- user_profiles

id (UUID, PK, DEFAULT gen_random_uuid()): 프로필 고유 ID.

user_id (UUID, FK auth.users(id)): Supabase Auth 사용자 ID. (UNIQUE)

username (TEXT, UNIQUE, NOT NULL): Vibe Code 내에서 표시될 고유 사용자 이름.

display_name (TEXT): 사용자가 설정한 표시 이름 (닉네임).

avatar_url (TEXT): 프로필 이미지 URL (Supabase Storage 경로).

bio (TEXT): 사용자 소개 글.

github_url (TEXT): GitHub 프로필 URL.

linkedin_url (TEXT): LinkedIn 프로필 URL.

website_url (TEXT): 개인 웹사이트 URL.

total_vibe_checks_received (INTEGER, DEFAULT 0): 받은 총 Vibe Check 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 프로필 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 프로필 마지막 업데이트 일시.

is_public (BOOLEAN, DEFAULT TRUE): 프로필 공개 여부.

Indexes: user_id (UNIQUE), username (UNIQUE).

#### 2. Projects Showcase Tables
- projects

id (UUID, PK, DEFAULT gen_random_uuid()): 프로젝트 고유 ID.

user_id (UUID, FK user_profiles(user_id)): 프로젝트 작성자 ID.

title (TEXT, NOT NULL): 프로젝트 제목.

tagline (TEXT, NOT NULL): 한 줄 요약.

hero_image_url (TEXT, NOT NULL): 대표 이미지 URL.

content (TEXT, NOT NULL): 프로젝트 상세 설명 (Markdown).

github_url (TEXT): GitHub 리포지토리 URL.

live_demo_url (TEXT): 라이브 데모 URL.

deployment_platform (TEXT): 배포 플랫폼.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 'Retro Casual' 또는 'Modern Sans-serif'.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

is_public (BOOLEAN, DEFAULT TRUE): 공개 여부.

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, created_at, vibe_check_count.

- project_categories (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

category_name (TEXT, PK)

Note: category_name은 별도의 categories 테이블을 만들어 FK로 연결할 수도 있습니다. (예: categories.id)

- project_features

id (UUID, PK, DEFAULT gen_random_uuid())

project_id (UUID, FK projects(id)): 소속 프로젝트 ID.

feature_text (TEXT, NOT NULL): 기능 설명.

order_index (INTEGER): 기능 순서.

Indexes: project_id.

- project_technologies (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

tech_name (TEXT, PK)

Note: tech_name도 별도의 technologies 테이블을 만들어 FK로 연결할 수 있습니다.

- project_tools (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

tool_name (TEXT, PK)

Note: tool_name도 별도의 tools 테이블을 만들어 FK로 연결할 수 있습니다.

#### 3. Tool & Tech Review Tables
- tool_reviews

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 리뷰 작성자 ID.

title (TEXT, NOT NULL): 리뷰 제목.

tool_tech_name (TEXT, NOT NULL): 리뷰 대상 도구/기술 이름.

overall_rating (INTEGER, NOT NULL, CHECK (overall_rating BETWEEN 1 AND 5)): 종합 평점.

one_liner_pros (TEXT): 한 줄 장점.

one_liner_cons (TEXT): 한 줄 단점.

content (TEXT, NOT NULL): 상세 리뷰 본문 (Markdown).

hero_image_url (TEXT): 대표 이미지/스크린샷 URL.

demo_video_url (TEXT): 데모 비디오 URL.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 폰트 설정.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, tool_tech_name, overall_rating, created_at.

- review_categories (N:M 관계를 위한 조인 테이블)

review_id (UUID, FK tool_reviews(id), PK)

category_name (TEXT, PK)

#### 4. Community (Coding Lounge) Tables
- community_posts

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 게시물 작성자 ID.

title (TEXT, NOT NULL): 게시물 제목.

content (TEXT, NOT NULL): 게시물 본문 (Markdown).

image_urls (TEXT[]): 첨부 이미지 URL 배열.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 폰트 설정.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, created_at.

- community_post_tags (N:M 관계를 위한 조인 테이블)

post_id (UUID, FK community_posts(id), PK)

tag_name (TEXT, PK)

- community_polls (선택 사항 - 만약 투표 기능을 구현한다면)

id (UUID, PK, DEFAULT gen_random_uuid())

post_id (UUID, FK community_posts(id), UNIQUE): 소속 게시물 ID.

question (TEXT, NOT NULL): 투표 질문.

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

- community_poll_options

id (UUID, PK, DEFAULT gen_random_uuid())

poll_id (UUID, FK community_polls(id))

option_text (TEXT, NOT NULL): 투표 항목 텍스트.

vote_count (INTEGER, DEFAULT 0): 해당 항목 투표 수.

- community_poll_votes

poll_option_id (UUID, FK community_poll_options(id), PK)

user_id (UUID, FK user_profiles(user_id), PK)

voted_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

#### 5. Vibe News Tables
- news_articles

id (UUID, PK, DEFAULT gen_random_uuid())

admin_id (UUID, FK user_profiles(user_id)): 게시 관리자 ID (F-07 참조).

title (TEXT, NOT NULL): 기사 제목.

summary (TEXT): 기사 요약.

hero_image_url (TEXT): 대표 이미지 URL.

content (TEXT, NOT NULL): 기사 본문 (Markdown).

source_name (TEXT): 원본 뉴스 출처 이름.

source_url (TEXT): 원본 뉴스 URL.

crawled_at (TIMESTAMP WITH TIME ZONE, NOT NULL): 크롤링 일시.

published_at (TIMESTAMP WITH TIME ZONE): 사이트 게시 일시.

is_published (BOOLEAN, DEFAULT FALSE): 게시 여부.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

Indexes: published_at, crawled_at, admin_id.

- news_categories (N:M 관계를 위한 조인 테이블)

article_id (UUID, FK news_articles(id), PK)

category_name (TEXT, PK)

#### 6. Interaction and Statistics Tables
- comments (모든 게시판의 댓글을 통합 관리)

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 댓글 작성자 ID.

parent_id (UUID, FK comments(id)): 대댓글용 (셀프 참조).

content (TEXT, NOT NULL): 댓글 내용.

post_type (TEXT, NOT NULL, CHECK (post_type IN ('project', 'review', 'community', 'news'))): 댓글이 달린 게시물 유형.

post_id (UUID, NOT NULL): 댓글이 달린 게시물 ID (Generic FK - RLS로 타입별 접근 제어 필요).

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, post_id, created_at.

Note: post_id를 하나의 테이블에서 모두 관리하는 것은 유연하지만, RLS 정책 수립 시 post_type과 post_id를 함께 사용하여 해당 테이블에 대한 접근을 제한해야 합니다.

- vibe_checks (모든 게시물/댓글의 '좋아요'를 통합 관리)

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): Vibe Check을 누른 사용자 ID.

target_type (TEXT, NOT NULL, CHECK (target_type IN ('project', 'review', 'community', 'news', 'comment'))): Vibe Check 대상 유형.

target_id (UUID, NOT NULL): Vibe Check 대상의 ID (Generic FK).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): Vibe Check 일시.

Indexes: user_id, target_id, target_type.

Unique Constraint: (user_id, target_type, target_id) - 한 사용자가 한 대상에 한 번만 Vibe Check을 할 수 있도록.

- user_stats (이 테이블은 필요 없을 수도 있음)

Note: user_profiles 테이블의 total_vibe_checks_received 필드, 그리고 projects, tool_reviews, community_posts 테이블의 vibe_check_count 및 comment_count 필드로 충분히 통계 정보를 얻을 수 있습니다. 실시간 집계가 필요하다면 Supabase Functions(트리거)나 뷰를 사용하여 관리하는 것이 좋습니다.

#### 7. Main Page Aggregation Tables
- weekly_vibe_ranking (Materialized View or Aggregation Table)

project_id (UUID, PK, FK projects(id))

vibe_check_count_7_days (INTEGER)

last_updated (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

Note: projects 테이블의 vibe_checks 집계와 created_at을 활용하여 주간 랭킹을 집계하는 Materialized View나 스케줄러를 통한 정기적인 업데이트를 고려합니다.

### Database Maintenance
The database schema will be maintained and updated using the `table.md` file as the single source of truth for table structures. Any changes to the database schema should be reflected in this file first, and then implemented through migration scripts.

This approach ensures:
1. **Consistency**: All team members have a clear understanding of the database structure
2. **Documentation**: The database design is well-documented and easily accessible
3. **Version Control**: Changes to the database schema are tracked through version control
4. **Maintainability**: Updates to the database structure can be managed systematically

## Technical Details
- Framework: Next.js 14 with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Custom React components
- Responsive Design: Mobile-first approach
- Icons: Material Symbols
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- Storage: Supabase Storage
- Realtime: Supabase Realtime
- Deployment: Netlify (planned)

## Directory Structure
```
app/
├── components/
│   ├── navbar.tsx
│   ├── topnav.tsx
│   ├── NewProjectButton.tsx
│   ├── NewReviewButton.tsx
│   └── NewPostButton.tsx
├── mainpage/
│   ├── HeroSection.tsx
│   ├── WeeklyVibeRanking.tsx
│   ├── LatestProjects.tsx
│   └── VibeNews.tsx
├── projects/
│   ├── [id]/
│   │   ├── page.tsx
│   │   ├── ProjectShowcaseDetail.tsx
│   │   ├── FeatureList.tsx
│   │   ├── TechnologyStack.tsx
│   │   ├── RelatedProjects.tsx
│   │   └── CommentsSection.tsx
│   ├── create/
│   │   ├── page.tsx
│   │   ├── ProjectCreateForm.tsx
│   │   ├── CoreInfoSection.tsx
│   │   ├── DescriptionSection.tsx
│   │   ├── CategorizationSection.tsx
│   │   ├── LinksSection.tsx
│   │   └── StatusSection.tsx
│   ├── drafts/
│   │   ├── page.tsx
│   │   └── DraftsPage.tsx
│   ├── page.tsx
│   ├── ProjectsShowcase.tsx
│   ├── SearchAndFilter.tsx
│   ├── ProjectCard.tsx
│   └── Pagination.tsx
├── gear/
│   ├── [id]/
│   │   ├── page.tsx
│   │   ├── ToolTechReviewDetail.tsx
│   │   ├── BackButton.tsx
│   │   ├── Header.tsx
│   │   ├── AuthorInfo.tsx
│   │   ├── ReviewImage.tsx
│   │   ├── ReviewContent.tsx
│   │   ├── Tags.tsx
│   │   └── CommentsSection.tsx
│   ├── create/
│   │   ├── page.tsx
│   │   ├── ToolTechReviewForm.tsx
│   │   ├── CoreInfoSection.tsx
│   │   ├── QuickProsConsSection.tsx
│   │   ├── DetailedReviewSection.tsx
│   │   ├── MediaSection.tsx
│   │   ├── CategorizationSection.tsx
│   │   └── ActionButtons.tsx
│   ├── drafts/
│   │   └── page.tsx
│   ├── page.tsx
│   ├── ToolTechHeader.tsx
│   ├── ToolTechReviews.tsx
│   └── ToolTechReviewCard.tsx
├── community/
│   ├── [id]/
│   │   ├── page.tsx
│   ├── create/
│   │   ├── page.tsx
│   │   ├── CommunityPostForm.tsx
│   │   └── CommunityPostContentSection.tsx
│   ├── page.tsx
│   ├── CommunityHeader.tsx
│   ├── CommunityPosts.tsx
│   └── CommunityPostCard.tsx
├── news/
│   ├── [id]/
│   │   ├── page.tsx
│   │   ├── NewsArticleDetail.tsx
│   │   ├── ExploreMoreSection.tsx
│   │   ├── RelatedNewsSection.tsx
│   │   └── RelatedNewsCard.tsx
│   ├── page.tsx
│   ├── NewsHeader.tsx
│   ├── NewsArticles.tsx
│   └── NewsArticleCard.tsx
├── profile/
│   ├── [id]/
│   │   ├── page.tsx
│   │   └── UserProfile.tsx
│   ├── edit/
│   │   ├── page.tsx
│   │   ├── BasicInfoEditor.tsx
│   │   ├── SocialLinksEditor.tsx
│   │   └── AccountSettingsEditor.tsx
│   ├── page.tsx
│   └── UserProfile.tsx
├── page.tsx
├── layout.tsx
└── globals.css
```