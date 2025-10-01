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