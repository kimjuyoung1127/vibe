// app/projects/create/utils/suggestionUtils.ts
// Utility functions to generate common suggestions for tech stack, tools, and categories.
// Now with categories and popularity for a better UX in AdvancedSelect.

import { Option } from "@/app/components/AdvancedSelect"; // Assuming AdvancedSelect is in components

/**
 * Generates a list of common technology stack options with categories.
 */
export const getCommonTechStackOptions = (): Option[] => {
  return [
    // --- Core & Frontend ---
    { value: 'react', label: 'React', category: 'Frontend', popular: true },
    { value: 'nextjs', label: 'Next.js', category: 'Frontend', popular: true },
    { value: 'typescript', label: 'TypeScript', category: 'Frontend', popular: true },
    { value: 'javascript', label: 'JavaScript', category: 'Frontend', popular: true },
    { value: 'vue', label: 'Vue.js', category: 'Frontend' },
    { value: 'angular', label: 'Angular', category: 'Frontend' },
    { value: 'svelte', label: 'Svelte', category: 'Frontend' },
    { value: 'solidjs', label: 'SolidJS', category: 'Frontend' },
    { value: 'qwik', label: 'Qwik', category: 'Frontend' },
    { value: 'astro', label: 'Astro', category: 'Frontend' },
    { value: 'remix', label: 'Remix', category: 'Frontend' },
    { value: 'elm', label: 'Elm', category: 'Frontend' },
    { value: 'figma', label: 'Figma', category: 'Frontend', popular: true },
    { value: 'slack', label: 'Slack', category: 'Frontend', popular: true },

    // --- UI/UX & Styling ---
    { value: 'tailwindcss', label: 'Tailwind CSS', category: 'UI/UX & Styling', popular: true },
    { value: 'shadcn-ui', label: 'shadcn/ui', category: 'UI/UX & Styling', popular: true },
    { value: 'framer-motion', label: 'Framer Motion', category: 'UI/UX & Styling' },
    { value: 'threejs', label: 'Three.js', category: 'UI/UX & Styling' },
    { value: 'webgl', label: 'WebGL', category: 'UI/UX & Styling' },

    // --- Backend ---
    { value: 'nodejs', label: 'Node.js', category: 'Backend', popular: true },
    { value: 'python', label: 'Python', category: 'Backend', popular: true },
    { value: 'express', label: 'Express', category: 'Backend' },
    { value: 'deno', label: 'Deno', category: 'Backend' },
    { value: 'bun', label: 'Bun', category: 'Backend' },
    { value: 'django', label: 'Django', category: 'Backend' },
    { value: 'flask', label: 'Flask', category: 'Backend' },
    { value: 'java', label: 'Java', category: 'Backend' },
    { value: 'spring', label: 'Spring Boot', category: 'Backend' },
    { value: 'go', label: 'Go', category: 'Backend' },
    { value: 'rust', label: 'Rust', category: 'Backend' },
    { value: 'graphql', label: 'GraphQL', category: 'Backend' },
    { value: 'apollo', label: 'Apollo', category: 'Backend' },
    { value: 'trpc', label: 'tRPC', category: 'Backend' },

    // --- Database & Storage ---
    { value: 'postgresql', label: 'PostgreSQL', category: 'Database & Storage', popular: true },
    { value: 'mongodb', label: 'MongoDB', category: 'Database & Storage', popular: true },
    { value: 'mysql', label: 'MySQL', category: 'Database & Storage' },
    { value: 'redis', label: 'Redis', category: 'Database & Storage' },
    { value: 'prisma', label: 'Prisma', category: 'Database & Storage' },
    { value: 'drizzle', label: 'Drizzle ORM', category: 'Database & Storage' },
    { value: 'planetscale', label: 'PlanetScale', category: 'Database & Storage' },
    { value: 'neon', label: 'Neon', category: 'Database & Storage' },
    { value: 'upstash', label: 'Upstash', category: 'Database & Storage' },
    { value: 'weaviate', label: 'Weaviate', category: 'Database & Storage' },
    { value: 'milvus', label: 'Milvus', category: 'Database & Storage' },
    { value: 'chromadb', label: 'ChromaDB', category: 'Database & Storage' },

    // --- AI/ML ---
    { value: 'openai', label: 'OpenAI', category: 'AI/ML', popular: true },
    { value: 'huggingface', label: 'Hugging Face', category: 'AI/ML', popular: true },
    { value: 'langchain', label: 'LangChain', category: 'AI/ML', popular: true },
    { value: 'ai-ml', label: 'AI/ML', category: 'AI/ML' },
    { value: 'anthropic', label: 'Anthropic', category: 'AI/ML' },
    { value: 'tensorflow', label: 'TensorFlow', category: 'AI/ML' },
    { value: 'pytorch', label: 'PyTorch', category: 'AI/ML' },
    { value: 'vercel-ai', label: 'Vercel AI', category: 'AI/ML' },
    { value: 'kubeflow', label: 'Kubeflow', category: 'AI/ML' },

    // --- DX, Build & Testing ---
    { value: 'vite', label: 'Vite', category: 'DX, Build & Testing', popular: true },
    { value: 'jest', label: 'Jest', category: 'DX, Build & Testing', popular: true },
    { value: 'esbuild', label: 'esbuild', category: 'DX, Build & Testing' },
    { value: 'turbopack', label: 'Turbopack', category: 'DX, Build & Testing' },
    { value: 'vitest', label: 'Vitest', category: 'DX, Build & Testing' },
    { value: 'cypress', label: 'Cypress', category: 'DX, Build & Testing' },
    { value: 'playwright', label: 'Playwright', category: 'DX, Build & Testing' },
    { value: 'eslint', label: 'ESLint', category: 'DX, Build & Testing' },
    { value: 'prettier', label: 'Prettier', category: 'DX, Build & Testing' },

    // --- Deployment & Infrastructure ---
    { value: 'docker', label: 'Docker', category: 'Deployment & Infrastructure', popular: true },
    { value: 'aws', label: 'AWS', category: 'Deployment & Infrastructure', popular: true },
    { value: 'firebase', label: 'Firebase', category: 'Deployment & Infrastructure', popular: true },
    { value: 'supabase', label: 'Supabase', category: 'Deployment & Infrastructure', popular: true },
    { value: 'kubernetes', label: 'Kubernetes', category: 'Deployment & Infrastructure' },
    { value: 'appwrite', label: 'Appwrite', category: 'Deployment & Infrastructure' },
    { value: 'cloudflare', label: 'Cloudflare', category: 'Deployment & Infrastructure' },
    { value: 'railway', label: 'Railway', category: 'Deployment & Infrastructure' },
    { value: 'webassembly', label: 'WebAssembly', category: 'Deployment & Infrastructure' },
  ];
};

/**
 * Generates a list of common development tools with categories.
 */
export const getCommonDevToolsOptions = (): Option[] => {
  return [
    // --- AI Assistants & Code Generation ---
    { value: 'github-copilot', label: 'GitHub Copilot', category: 'AI Assistants', popular: true },
    { value: 'chatgpt', label: 'ChatGPT', category: 'AI Assistants', popular: true },
    { value: 'gemini', label: 'Gemini', category: 'AI Assistants', popular: true },
    { value: 'cursor', label: 'Cursor AI', category: 'AI Assistants' },
    { value: 'tabnine', label: 'Tabnine', category: 'AI Assistants' },
    { value: 'codeium', label: 'Codeium', category: 'AI Assistants' },
    { value: 'claude', label: 'Claude', category: 'AI Assistants' },

    // --- Code Editors & IDEs ---
    { value: 'vscode', label: 'Visual Studio Code', category: 'Editors & IDEs', popular: true },
    { value: 'intellij', label: 'IntelliJ IDEA', category: 'Editors & IDEs' },
    { value: 'webstorm', label: 'WebStorm', category: 'Editors & IDEs' },
    { value: 'vim', label: 'Vim', category: 'Editors & IDEs' },
    { value: 'neovim', label: 'Neovim', category: 'Editors & IDEs' },
    
    // --- Prototyping & Design ---
    { value: 'storybook', label: 'Storybook', category: 'Prototyping & Design', popular: true },
    { value: 'v0', label: 'v0 by Vercel', category: 'Prototyping & Design' },
    { value: 'docusaurus', label: 'Docusaurus', category: 'Prototyping & Design' },
    { value: 'adobe-xd', label: 'Adobe XD', category: 'Prototyping & Design' },

    // --- Version Control & Collaboration ---
    { value: 'git', label: 'Git', category: 'Version Control', popular: true },
    { value: 'github', label: 'GitHub', category: 'Version Control', popular: true },
    { value: 'gitlab', label: 'GitLab', category: 'Version Control' },
    { value: 'notion', label: 'Notion', category: 'Collaboration' },
    { value: 'discord', label: 'Discord', category: 'Collaboration' },

    // --- Platforms & Services ---
    { value: 'vercel', label: 'Vercel', category: 'Platforms & Services', popular: true },
    { value: 'netlify', label: 'Netlify', category: 'Platforms & Services', popular: true },
    { value: 'huggingface', label: 'Hugging Face', category: 'Platforms & Services' },
    { value: 'pinecone', label: 'Pinecone', category: 'Platforms & Services' },
    { value: 'supabase', label: 'Supabase', category: 'Platforms & Services' },
    { value: 'firebase', label: 'Firebase', category: 'Platforms & Services' },
    { value: 'railway', label: 'Railway', category: 'Platforms & Services' },

    // --- Code Quality & Analysis ---
    { value: 'sonarqube', label: 'SonarQube', category: 'Code Quality' },

    // --- API & Network Tools ---
    { value: 'postman', label: 'Postman', category: 'API Tools' },
    { value: 'insomnia', label: 'Insomnia', category: 'API Tools' },

    // --- Online IDEs & Sandboxes ---
    { value: 'replit', label: 'Replit', category: 'Online IDEs' },
    { value: 'codesandbox', label: 'CodeSandbox', category: 'Online IDEs' },
    { value: 'stackblitz', label: 'StackBlitz', category: 'Online IDEs' },
    { value: 'glitch', label: 'Glitch', category: 'Online IDEs' },

    // --- Generative Media ---
    { value: 'midjourney', label: 'Midjourney', category: 'Generative Media' },
    { value: 'dall-e', label: 'DALL-E', category: 'Generative Media' },
    { value: 'leonardo-ai', label: 'Leonardo AI', category: 'Generative Media' },
    { value: 'stable-diffusion', label: 'Stable Diffusion', category: 'Generative Media' },
    { value: 'runwayml', label: 'RunwayML', category: 'Generative Media' },
    { value: 'replicate', label: 'Replicate', category: 'Generative Media' },
  ];
};

/**
 * Generates a list of common project category tags with categories.
 */
export const getCommonCategoryTagsOptions = (): Option[] => {
  return [
    { value: 'web-app', label: 'Web Application', category: 'Project Type', popular: true },
    { value: 'mobile-app', label: 'Mobile Application', category: 'Project Type', popular: true },
    { value: 'ai-ml', label: 'AI/Machine Learning', category: 'Project Type', popular: true },
    { value: 'open-source', label: 'Open Source', category: 'Project Type', popular: true },
    { value: 'developer-tool', label: 'Developer Tool', category: 'Project Type', popular: true },
    { value: 'side-project', label: 'Side Project', category: 'Project Type' },
    { value: 'api', label: 'API', category: 'Project Type' },
    { value: 'library', label: 'Library', category: 'Project Type' },
    { value: 'framework', label: 'Framework', category: 'Project Type' },
    { value: 'tool', label: 'Tool', category: 'Project Type' },
    { value: 'data-science', label: 'Data Science', category: 'Project Type' },
    { value: 'devops', label: 'DevOps', category: 'Project Type' },
    { value: 'game', label: 'Game', category: 'Project Type' },
    { value: 'tutorial', label: 'Tutorial', category: 'Project Type' },
    { value: 'boilerplate', label: 'Boilerplate', category: 'Project Type' },
    { value: 'template', label: 'Template', category: 'Project Type' },
    { value: 'design-system', label: 'Design System', category: 'Project Type' },
    { value: 'saas', label: 'SaaS', category: 'Project Type' },
    { value: 'ecommerce', label: 'E-commerce', category: 'Project Type' },
    { value: 'cms', label: 'CMS', category: 'Project Type' },
    { value: 'blog', label: 'Blog', category: 'Project Type' },
    { value: 'portfolio', label: 'Portfolio', category: 'Project Type' },
    { value: 'showcase', label: 'Showcase', category: 'Project Type' },
    { value: 'hackathon', label: 'Hackathon', category: 'Project Type' },
    { value: 'experimental', label: 'Experimental', category: 'Project Type' },
    { value: 'prototype', label: 'Prototype', category: 'Project Type' },

    { value: 'vibe-coding', label: 'Vibe Coding', category: 'Vibe Coding', popular: true },
    { value: 'generative-ai', label: 'Generative AI', category: 'Vibe Coding', popular: true },
    { value: 'ai-assisted', label: 'AI-Assisted', category: 'Vibe Coding' },
    { value: 'low-code', label: 'Low-Code', category: 'Vibe Coding' },
    { value: 'no-code', label: 'No-Code', category: 'Vibe Coding' },
    { value: 'prompt-engineering', label: 'Prompt Engineering', category: 'Vibe Coding' },
    { value: 'llm', label: 'Large Language Model', category: 'Vibe Coding' },
    { value: 'copilot', label: 'AI Copilot', category: 'Vibe Coding' },
    { value: 'automation', label: 'Automation', category: 'Vibe Coding' },
    { value: 'productivity', label: 'Productivity', category: 'Vibe Coding' },
    { value: 'ai-art', label: 'AI Art', category: 'Vibe Coding' },
    { value: 'image-generation', label: 'Image Generation', category: 'Vibe Coding' },
    { value: 'chatbot', label: 'Chatbot', category: 'Vibe Coding' },
    { value: 'voice-assistant', label: 'Voice Assistant', category: 'Vibe Coding' },
    { value: 'code-generator', label: 'Code Generator', category: 'Vibe Coding' },
  ];
};

/**
 * Generates a list of common key project features with categories.
 */
export const getCommonKeyFeaturesOptions = (): Option[] => {
  return [
    // --- Core Features ---
    { value: 'user-authentication', label: 'User Authentication', category: 'Core Features', popular: true },
    { value: 'responsive-design', label: 'Responsive Design', category: 'Core Features', popular: true },
    { value: 'dark-mode', label: 'Dark Mode', category: 'Core Features', popular: true },
    { value: 'api-integration', label: 'API Integration', category: 'Core Features' },
    { value: 'search-functionality', label: 'Search Functionality', category: 'Core Features' },
    { value: 'notifications', label: 'Notifications', category: 'Core Features' },
    { value: 'file-upload', label: 'File Upload', category: 'Core Features' },
    { value: 'role-based-access', label: 'Role-based Access Control', category: 'Core Features' },
    { value: 'analytics-dashboard', label: 'Analytics Dashboard', category: 'Core Features' },
    { value: 'customizable-themes', label: 'Customizable Themes', category: 'Core Features' },
    { value: 'multi-language-support', label: 'Multi-language Support', category: 'Core Features' },
    { value: 'offline-capability', label: 'Offline Capability', category: 'Core Features' },
    { value: 'data-export-import', label: 'Data Export/Import', category: 'Core Features' },
    { value: 'performance-monitoring', label: 'Performance Monitoring', category: 'Core Features' },
    { value: 'automated-backups', label: 'Automated Backups', category: 'Core Features' },
    { value: 'social-sharing', label: 'Social Sharing', category: 'Core Features' },
    { value: 'in-app-messaging', label: 'In-app Messaging', category: 'Core Features' },
    { value: 'personalization', label: 'Personalization', category: 'Core Features' },
    { value: 'drag-and-drop-ui', label: 'Drag and Drop Interface', category: 'Core Features' },
    { value: 'real-time-collaboration', label: 'Real-time Collaboration', category: 'Core Features' },

    // --- AI-Powered Features ---
    { value: 'ai-assisted-coding', label: 'AI-Assisted Coding', category: 'AI-Powered', popular: true },
    { value: 'natural-language-prompts', label: 'Natural Language Prompts', category: 'AI-Powered', popular: true },
    { value: 'code-generation', label: 'Code Generation', category: 'AI-Powered', popular: true },
    { value: 'smart-autocomplete', label: 'Smart Autocomplete', category: 'AI-Powered' },
    { value: 'context-aware-suggestions', label: 'Context-Aware Suggestions', category: 'AI-Powered' },
    { value: 'error-correction', label: 'Error Correction', category: 'AI-Powered' },
    { value: 'code-explanation', label: 'Code Explanation', category: 'AI-Powered' },
    { value: 'refactoring-assistance', label: 'Refactoring Assistance', category: 'AI-Powered' },
    { value: 'documentation-generation', label: 'Documentation Generation', category: 'AI-Powered' },
    { value: 'testing-assistance', label: 'Testing Assistance', category: 'AI-Powered' },
    { value: 'debugging-help', label: 'Debugging Help', category: 'AI-Powered' },
    { value: 'performance-optimization', label: 'Performance Optimization', category: 'AI-Powered' },
    { value: 'security-analysis', label: 'Security Analysis', category: 'AI-Powered' },
    { value: 'code-review', label: 'AI Code Review', category: 'AI-Powered' },
    { value: 'version-control', label: 'Version Control Integration', category: 'AI-Powered' },
    { value: 'deployment-assistance', label: 'Deployment Assistance', category: 'AI-Powered' },
    { value: 'template-generation', label: 'Template Generation', category: 'AI-Powered' },
    { value: 'component-generation', label: 'Component Generation', category: 'AI-Powered' },
    { value: 'ui-generation', label: 'UI Generation', category: 'AI-Powered' },
    { value: 'image-generation', label: 'Image Generation', category: 'AI-Powered' },
    { value: 'voice-control', label: 'Voice Control', category: 'AI-Powered' },
    { value: 'gesture-control', label: 'Gesture Control', category: 'AI-Powered' },
    { value: 'collaborative-ai', label: 'Collaborative AI', category: 'AI-Powered' },
    { value: 'learning-assistant', label: 'Learning Assistant', category: 'AI-Powered' },
    { value: 'workflow-automation', label: 'Workflow Automation', category: 'AI-Powered' },
    { value: 'task-assistant', label: 'Task Assistant', category: 'AI-Powered' },
    { value: 'project-planning', label: 'Project Planning', category: 'AI-Powered' },
    { value: 'idea-generation', label: 'Idea Generation', category: 'AI-Powered' },
    { value: 'prototyping', label: 'Rapid Prototyping', category: 'AI-Powered' },
    { value: 'showcase-mode', label: 'Showcase Mode', category: 'AI-Powered' },
  ];
};