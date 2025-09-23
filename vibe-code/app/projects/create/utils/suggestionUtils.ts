// app/projects/create/utils/suggestionUtils.ts
// Utility functions to generate common suggestions for tech stack, tools, and categories

/**
 * Generates a list of common technology stack options.
 * These can be used as initial suggestions or defaults.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonTechStackOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'express', label: 'Express' },
    { value: 'python', label: 'Python' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' },
    { value: 'java', label: 'Java' },
    { value: 'spring', label: 'Spring Boot' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'redis', label: 'Redis' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'supabase', label: 'Supabase' },
    // Additional Vibe Coding Technologies
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'huggingface', label: 'Hugging Face' },
    { value: 'langchain', label: 'LangChain' },
    { value: 'vercel-ai', label: 'Vercel AI' },
    { value: 'tailwindcss', label: 'Tailwind CSS' },
    { value: 'shadcn-ui', label: 'shadcn/ui' },
    { value: 'framer-motion', label: 'Framer Motion' },
    { value: 'threejs', label: 'Three.js' },
    { value: 'webgl', label: 'WebGL' },
    { value: 'webassembly', label: 'WebAssembly' },
    { value: 'graphql', label: 'GraphQL' },
    { value: 'apollo', label: 'Apollo' },
    { value: 'prisma', label: 'Prisma' },
    { value: 'drizzle', label: 'Drizzle ORM' },
    { value: 'trpc', label: 'tRPC' },
    { value: 'react-query', label: 'React Query' },
    { value: 'zustand', label: 'Zustand' },
    { value: 'redux', label: 'Redux' },
    { value: 'solidjs', label: 'SolidJS' },
    { value: 'qwik', label: 'Qwik' },
    { value: 'astro', label: 'Astro' },
    { value: 'remix', label: 'Remix' },
    { value: 'deno', label: 'Deno' },
    { value: 'bun', label: 'Bun' },
    { value: 'cloudflare', label: 'Cloudflare' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'appwrite', label: 'Appwrite' },
    { value: 'planetscale', label: 'PlanetScale' },
    { value: 'neon', label: 'Neon' },
    { value: 'railway', label: 'Railway' },
    { value: 'upstash', label: 'Upstash' },
  ];
};

/**
 * Generates a list of common development tools.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonDevToolsOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'vscode', label: 'Visual Studio Code' },
    { value: 'intellij', label: 'IntelliJ IDEA' },
    { value: 'webstorm', label: 'WebStorm' },
    { value: 'vim', label: 'Vim' },
    { value: 'neovim', label: 'Neovim' },
    { value: 'git', label: 'Git' },
    { value: 'github', label: 'GitHub' },
    { value: 'gitlab', label: 'GitLab' },
    { value: 'figma', label: 'Figma' },
    { value: 'adobe-xd', label: 'Adobe XD' },
    { value: 'postman', label: 'Postman' },
    { value: 'insomnia', label: 'Insomnia' },
    { value: 'notion', label: 'Notion' },
    { value: 'slack', label: 'Slack' },
    { value: 'discord', label: 'Discord' },
    { value: 'zoom', label: 'Zoom' },
    // Vibe Coding Tools
    { value: 'cursor', label: 'Cursor AI' },
    { value: 'github-copilot', label: 'GitHub Copilot' },
    { value: 'tabnine', label: 'Tabnine' },
    { value: 'codeium', label: 'Codeium' },
    { value: 'replit', label: 'Replit' },
    { value: 'glitch', label: 'Glitch' },
    { value: 'codesandbox', label: 'CodeSandbox' },
    { value: 'stackblitz', label: 'StackBlitz' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'v0', label: 'v0 by Vercel' },
    { value: 'stitch', label: 'Google Stitch' },
    { value: 'midjourney', label: 'Midjourney' },
    { value: 'dall-e', label: 'DALL-E' },
    { value: 'leonardo-ai', label: 'Leonardo AI' },
    { value: 'stable-diffusion', label: 'Stable Diffusion' },
    { value: 'runwayml', label: 'RunwayML' },
    { value: 'replicate', label: 'Replicate' },
    { value: 'huggingface', label: 'Hugging Face' },
    { value: 'langchain', label: 'LangChain' },
    { value: 'pinecone', label: 'Pinecone' },
    { value: 'supabase', label: 'Supabase' },
    { value: 'firebase', label: 'Firebase' },
    { value: 'railway', label: 'Railway' },
    { value: 'vercel', label: 'Vercel' },
    { value: 'netlify', label: 'Netlify' },
  ];
};

/**
 * Generates a list of common project category tags.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonCategoryTagsOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'api', label: 'API' },
    { value: 'library', label: 'Library' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'ai-ml', label: 'AI/Machine Learning' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'devops', label: 'DevOps' },
    { value: 'game', label: 'Game' },
    { value: 'open-source', label: 'Open Source' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'boilerplate', label: 'Boilerplate' },
    { value: 'template', label: 'Template' },
    { value: 'design-system', label: 'Design System' },
    { value: 'saas', label: 'SaaS' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'cms', label: 'CMS' },
    { value: 'blog', label: 'Blog' },
    // Vibe Coding Categories
    { value: 'ai-assisted', label: 'AI-Assisted' },
    { value: 'vibe-coding', label: 'Vibe Coding' },
    { value: 'generative-ai', label: 'Generative AI' },
    { value: 'low-code', label: 'Low-Code' },
    { value: 'no-code', label: 'No-Code' },
    { value: 'prompt-engineering', label: 'Prompt Engineering' },
    { value: 'llm', label: 'Large Language Model' },
    { value: 'copilot', label: 'AI Copilot' },
    { value: 'automation', label: 'Automation' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'developer-tool', label: 'Developer Tool' },
    { value: 'ai-art', label: 'AI Art' },
    { value: 'image-generation', label: 'Image Generation' },
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'voice-assistant', label: 'Voice Assistant' },
    { value: 'code-generator', label: 'Code Generator' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'experimental', label: 'Experimental' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'side-project', label: 'Side Project' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'showcase', label: 'Showcase' },
  ];
};

/**
 * Generates a list of common key project features.
 * These are general features that many projects might have.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonKeyFeaturesOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'user-authentication', label: 'User Authentication' },
    { value: 'real-time-collaboration', label: 'Real-time Collaboration' },
    { value: 'drag-and-drop-ui', label: 'Drag and Drop Interface' },
    { value: 'api-integration', label: 'API Integration' },
    { value: 'responsive-design', label: 'Responsive Design' },
    { value: 'dark-mode', label: 'Dark Mode' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'file-upload', label: 'File Upload' },
    { value: 'search-functionality', label: 'Search Functionality' },
    { value: 'analytics-dashboard', label: 'Analytics Dashboard' },
    { value: 'customizable-themes', label: 'Customizable Themes' },
    { value: 'multi-language-support', label: 'Multi-language Support' },
    { value: 'offline-capability', label: 'Offline Capability' },
    { value: 'data-export-import', label: 'Data Export/Import' },
    { value: 'role-based-access', label: 'Role-based Access Control' },
    { value: 'performance-monitoring', label: 'Performance Monitoring' },
    { value: 'automated-backups', label: 'Automated Backups' },
    { value: 'social-sharing', label: 'Social Sharing' },
    { value: 'in-app-messaging', label: 'In-app Messaging' },
    { value: 'personalization', label: 'Personalization' },
    // Vibe Coding Features
    { value: 'ai-assisted-coding', label: 'AI-Assisted Coding' },
    { value: 'natural-language-prompts', label: 'Natural Language Prompts' },
    { value: 'code-generation', label: 'Code Generation' },
    { value: 'smart-autocomplete', label: 'Smart Autocomplete' },
    { value: 'context-aware-suggestions', label: 'Context-Aware Suggestions' },
    { value: 'error-correction', label: 'Error Correction' },
    { value: 'code-explanation', label: 'Code Explanation' },
    { value: 'refactoring-assistance', label: 'Refactoring Assistance' },
    { value: 'documentation-generation', label: 'Documentation Generation' },
    { value: 'testing-assistance', label: 'Testing Assistance' },
    { value: 'debugging-help', label: 'Debugging Help' },
    { value: 'performance-optimization', label: 'Performance Optimization' },
    { value: 'security-analysis', label: 'Security Analysis' },
    { value: 'code-review', label: 'AI Code Review' },
    { value: 'version-control', label: 'Version Control Integration' },
    { value: 'deployment-assistance', label: 'Deployment Assistance' },
    { value: 'template-generation', label: 'Template Generation' },
    { value: 'component-generation', label: 'Component Generation' },
    { value: 'ui-generation', label: 'UI Generation' },
    { value: 'image-generation', label: 'Image Generation' },
    { value: 'voice-control', label: 'Voice Control' },
    { value: 'gesture-control', label: 'Gesture Control' },
    { value: 'collaborative-ai', label: 'Collaborative AI' },
    { value: 'learning-assistant', label: 'Learning Assistant' },
    { value: 'workflow-automation', label: 'Workflow Automation' },
    { value: 'task-assistant', label: 'Task Assistant' },
    { value: 'project-planning', label: 'Project Planning' },
    { value: 'idea-generation', label: 'Idea Generation' },
    { value: 'prototyping', label: 'Rapid Prototyping' },
    { value: 'showcase-mode', label: 'Showcase Mode' },
  ];
};

/**
 * Generates a list of common project taglines.
 * These are slogans that describe the project's vibe or purpose.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonProjectTaglines = (): { value: string; label: string }[] => {
  // This list is taken from sw.md
  return [
    // --- Innovation/Novelty ---
    { value: 'cutting_edge_sol', label: 'Coding the future, cutting-edge solution.' },
    { value: 'new_experience', label: 'A project that offers you a new experience.' },
    { value: 'breaking_ground', label: 'An innovative idea that breaks existing frameworks.' },
    { value: 'game_changer', label: 'My own rules that change the game.' },
    { value: 'next_gen_vibe', label: 'The next generation of Vibe starts here.' },

    // --- Utility/Practicality ---
    { value: 'everyday_problem', label: 'Smart tools that solve everyday problems.' },
    { value: 'essential_utility', label: 'Essential utility that transforms your workflow.' },
    { value: 'boost_productivity', label: 'Solutions that take productivity to the next level.' },
    { value: 'life_saver_dev', label: 'Developer time, now I save it.' },

    // --- Design/Aesthetics ---
    { value: 'visual_masterpiece', label: 'Beautiful UI/UX, visual masterpiece.' },
    { value: 'eye_candy_code', label: 'Code that adds viewing pleasure, captivating to the eye.' },
    { value: 'pixel_perfection', label: 'Perfect aesthetics, down to the pixel.' },
    { value: 'clean_design_bold_code', label: 'Clean design, bold code.' },

    // --- Community/Collaboration ---
    { value: 'dev_together', label: 'Hub for connection and sharing for developers.' },
    { value: 'collab_platform', label: 'A place for collaborative growth.' },
    { value: 'open_source_spirit', label: 'The spirit of open source for everyone.' },

    // --- Retro Vibe ---
    { value: 'nostalgia_meets_future', label: 'Retro code running toward the future, dressed in nostalgia.' },
    { value: 'pixel_perfect_modern', label: 'Modern projects implemented with pixel art sensibility.' },
    { value: '8bit_glitch', label: '8-bit sensibility, but without bugs.' },
    { value: 'vintage_tech_new_features', label: 'New features with vintage technology.' },

    // --- Efficiency/Simplicity ---
    { value: 'simple_powerful', label: 'Simple but powerful functionality.' },
    { value: 'effortless_efficiency', label: 'Maximum efficiency with minimal effort.' },
    { value: 'less_code_more_vibe', label: 'Less code, bigger vibe.' },

    // --- Fun/Personality ---
    { value: 'just_for_fun', label: 'Just started for fun, but I can\'t stop!' },
    { value: 'my_own_vibe', label: 'My own vibe, my own way of coding.' },
    { value: 'passion_project', label: 'My precious project driven by passion.' },
    { value: 'coding_is_art', label: 'Coding is art to me.' },

    // --- Challenge/Growth ---
    { value: 'my_first_project', label: 'Nervous, my first attempt.' },
    { value: 'level_up_code', label: 'Growth story of trial and error for skill-up.' },
    { value: 'pushing_limits', label: 'The thrill of challenging limits!' },

    // --- Meme/Wit ---
    { value: 'it_works_on_my_machine', label: 'It works on my machine, right?' },
    { value: 'stack_overflow_fueled', label: 'A project grown by Stack Overflow.' },
    { value: 'rubber_duck_approved', label: 'Final approval from Mr. Rubber Duck.' },
    { value: 'bug_free_maybe', label: 'No bugs... maybe?' },
    { value: 'git_blame_proof', label: 'Code free from Git blame.' },
  ];
};