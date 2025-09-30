# Vibe Hub - Developer Community Platform

Vibe Hub is a community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style. Share projects, reviews, and connect with like-minded developers.

## Table of Contents
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication with Google and GitHub
- Project showcase with detailed information
- Tool & Tech reviews with ratings
- Community forum for discussions
- News section with latest tech updates
- Modern retro pop art UI/UX design
- Responsive design for all devices
- SEO optimized
- Google Analytics integration
- Content moderation system
- User profiles with customization

## Technology Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Authentication, Database, Storage)
- React Hook Form (Form handling)
- React Markdown (Markdown rendering)
- Google Analytics
- Framer Motion (Animations)
- Three.js + React Three Fiber (3D effects)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/vibehub.git
cd vibehub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google OAuth (if using Google login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Usage
1. Register/Login to access all features
2. Create and showcase your projects
3. Write reviews for tools and technologies
4. Participate in community discussions
5. Read the latest tech news and updates

## Directory Structure
```
vibehub/
├── app/                    # Next.js 14 App Router
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── mainpage/           # Main page sections
│   ├── projects/           # Project showcase pages
│   ├── gear/               # Tool & Tech review pages
│   ├── community/          # Community forum pages
│   ├── news/               # News section pages
│   ├── profile/            # User profile pages
│   ├── privacy-policy/     # Legal pages
│   ├── terms-of-service/   # Legal pages
│   ├── content-guidelines/ # Legal pages
│   ├── cookie-policy/      # Legal pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── supabase/               # Supabase config and migrations
│   └── migrations/         # Database schema migrations
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## API Routes
- `/api/*` - Custom API routes (if any)
- Supabase API used for database operations

## Database Schema
The application uses Supabase PostgreSQL database with the following main tables:

- `users` - Supabase auth users table
- `profiles` - Extended user profile information
- `projects` - Project showcase information
- `tool_reviews` - Tool & technology reviews
- `community_posts` - Community forum posts
- `news_articles` - News articles
- `comments` - Comments on various content types
- `vibe_checks` - Likes/vibes for content
- `reports` - Content reporting system

## Performance Optimizations
Vibe Hub implements several performance optimizations to ensure fast loading times and a smooth user experience:

1. **Code Splitting**: Using React.lazy and Suspense for dynamic imports to reduce initial bundle size
2. **Image Optimization**: Using Next.js Image component with appropriate sizing and formats
3. **Font Optimization**: Preloading critical fonts and using font-display: swap
4. **Bundle Size Optimization**: Using SWC minification and tree-shaking
5. **Caching**: Proper HTTP caching headers for static assets
6. **Web Vitals Tracking**: Monitoring Core Web Vitals (LCP, FID, CLS) for continuous performance improvements
7. **Preloading Key Resources**: Preconnecting to external domains and preloading critical resources

## Testing
1. Unit tests: Run `npm run test` (if testing framework is set up)
2. Integration tests: Manual testing of user flows
3. End-to-end tests: [To be implemented]

## Deployment
This application is ready for deployment on Vercel or any Node.js hosting platform.

### Vercel Deployment
1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Deployment
Same as development, but with production URLs and keys

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
- Project Link: [https://github.com/yourusername/vibehub](https://github.com/yourusername/vibehub)
- Contact: [your-email@vibehub.dev](mailto:your-email@vibehub.dev)

---

Built with ❤️ for the developer community.