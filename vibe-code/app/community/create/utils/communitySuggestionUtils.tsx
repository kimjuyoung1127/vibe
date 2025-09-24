// app/community/create/utils/communitySuggestionUtils.tsx
// Utility functions to generate common suggestions for community post tags

/**
 * Generates a list of common community post tags.
 * These can be used as initial suggestions or defaults for community posts.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getCommonCommunityTagsOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'discussion', label: 'Discussion' },
    { value: 'help', label: 'Help' },
    { value: 'inspiration', label: 'Inspiration' },
    { value: 'showcase', label: 'Showcase' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'news', label: 'News' },
    { value: 'project', label: 'Project' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'mobile-dev', label: 'Mobile Development' },
    { value: 'devops', label: 'DevOps' },
    { value: 'career', label: 'Career' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'tools', label: 'Tools' },
    { value: 'open-source', label: 'Open Source' },
    { value: 'learning', label: 'Learning' },
    { value: 'experiment', label: 'Experiment' },
    { value: 'vibe-coding', label: 'Vibe Coding' },
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'portfolio', label: 'Portfolio' },
  ];
};

/**
 * Generates a list of additional tags based on project categories.
 * These can be used as additional tags for community posts that discuss projects.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getProjectCategoryTagsOptions = (): { value: string; label: string }[] => {
  return [
    { value: 'web-app', label: 'Web Application' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'api', label: 'API' },
    { value: 'library', label: 'Library' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'ai-mal', label: 'AI/Machine Learning' },
    { value: 'data-science', label: 'Data Science' },
    // { value: 'devops', label: 'DevOps' }, // Duplicate
    { value: 'game', label: 'Game' },
    // { value: 'open-source', label: 'Open Source' }, // Duplicate
    // { value: 'tutorial', label: 'Tutorial' }, // Duplicate
    { value: 'boilerplate', label: 'Boilerplate' },
    { value: 'template', label: 'Template' },
    { value: 'design-system', label: 'Design System' },
    { value: 'saas', label: 'SaaS' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'cms', label: 'CMS' },
    { value: 'blog', label: 'Blog' },
    // Vibe Coding Categories
    { value: 'ai-assisted', label: 'AI-Assisted' },
    // { value: 'vibe-coding', label: 'Vibe Coding' }, // Duplicate
    { value: 'generative-ai', label: 'Generative AI' },
    { value: 'low-code', label: 'Low-Code' },
    { value: 'no-code', label: 'No-Code' },
    { value: 'prompt-engineering', label: 'Prompt Engineering' },
    { value: 'llm', label: 'Large Language Model' },
    { value: 'copilot', label: 'AI Copilot' },
    { value: 'automation', label: 'Automation' },
    // { value: 'productivity', label: 'Productivity' }, // Duplicate
    { value: 'developer-tool', label: 'Developer Tool' },
    { value: 'ai-art', label: 'AI Art' },
    { value: 'image-generation', label: 'Image Generation' },
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'voice-assistant', label: 'Voice Assistant' },
    { value: 'code-generator', label: 'Code Generator' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'experimental', label: 'Experimental' },
    // { value: 'hackathon', label: 'Hackathon' }, // Duplicate
    { value: 'side-project', label: 'Side Project' },
    // { value: 'portfolio', label: 'Portfolio' }, // Duplicate
    // { value: 'showcase', label: 'Showcase' }, // Duplicate
  ];
};

/**
 * Generates a list of additional tags based on key project features.
 * These can be used as additional tags for community posts that discuss features.
 * @returns An array of objects with `value` and `label` properties.
 */
export const getKeyFeaturesTagsOptions = (): { value: string; label: string }[] => {
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
    // { value: 'image-generation', label: 'Image Generation' }, // Duplicate
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