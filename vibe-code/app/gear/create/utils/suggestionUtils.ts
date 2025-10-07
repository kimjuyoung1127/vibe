// app/gear/create/utils/suggestionUtils.ts
// Utility functions to generate common suggestions for gear/tool categories and tags.
// Now with categories and popularity for a better UX in AdvancedSelect.

import { Option } from "@/app/components/AdvancedSelect";

/**
 * Generates a list of common gear/tool categories with categories.
 */
export const getCommonGearCategoryOptions = (): Option[] => {
  return [
    // --- Hardware Categories ---
    { value: 'laptop', label: 'Laptop', category: 'Hardware', popular: true },
    { value: 'desktop', label: 'Desktop Computer', category: 'Hardware' },
    { value: 'monitor', label: 'Monitor', category: 'Hardware', popular: true },
    { value: 'keyboard', label: 'Keyboard', category: 'Hardware', popular: true },
    { value: 'mouse', label: 'Mouse', category: 'Hardware', popular: true },
    { value: 'headphones', label: 'Headphones', category: 'Hardware', popular: true },
    { value: 'microphone', label: 'Microphone', category: 'Hardware' },
    { value: 'webcam', label: 'Webcam', category: 'Hardware' },
    { value: 'tablet', label: 'Tablet', category: 'Hardware' },
    { value: 'phone', label: 'Smartphone', category: 'Hardware' },
    { value: 'gaming', label: 'Gaming Setup', category: 'Hardware' },
    { value: 'smart-home', label: 'Smart Home Devices', category: 'Hardware' },

    // --- Software Categories ---
    { value: 'ide', label: 'IDE/Editor', category: 'Software', popular: true },
    { value: 'os', label: 'Operating System', category: 'Software', popular: true },
    { value: 'browser', label: 'Web Browser', category: 'Software', popular: true },
    { value: 'ai-tool', label: 'AI Tool', category: 'Software', popular: true },
    { value: 'design-software', label: 'Design Software', category: 'Software' },
    { value: 'productivity', label: 'Productivity Tool', category: 'Software' },
    { value: 'development', label: 'Development Tool', category: 'Software', popular: true },
    { value: 'communication', label: 'Communication Tool', category: 'Software' },
    { value: 'project-management', label: 'Project Management', category: 'Software' },
    { value: 'database', label: 'Database Tool', category: 'Software' },
    { value: 'devops', label: 'DevOps Tool', category: 'Software' },
    { value: 'security', label: 'Security Tool', category: 'Software' },
    { value: 'monitoring', label: 'Monitoring Tool', category: 'Software' },
    { value: 'testing', label: 'Testing Tool', category: 'Software' },

    // --- Services Categories ---
    { value: 'cloud-platform', label: 'Cloud Platform', category: 'Services', popular: true },
    { value: 'hosting', label: 'Hosting Service', category: 'Services', popular: true },
    { value: 'api-service', label: 'API Service', category: 'Services' },
    { value: 'ai-service', label: 'AI Service', category: 'Services', popular: true },
    { value: 'database-service', label: 'Database Service', category: 'Services' },
    { value: 'storage-service', label: 'Storage Service', category: 'Services' },
    { value: 'authentication-service', label: 'Authentication Service', category: 'Services' },
    { value: 'monitoring-service', label: 'Monitoring Service', category: 'Services' },
    { value: 'deployment-service', label: 'Deployment Service', category: 'Services' },
  ];
};

/**
 * Generates a list of common gear tags with categories.
 */
export const getCommonGearTagsOptions = (): Option[] => {
  return [
    // --- Price Range ---
    { value: 'budget', label: 'Budget', category: 'Price Range', popular: true },
    { value: 'mid-range', label: 'Mid-Range', category: 'Price Range', popular: true },
    { value: 'premium', label: 'Premium', category: 'Price Range', popular: true },
    { value: 'enterprise', label: 'Enterprise', category: 'Price Range' },

    // --- Usage Type ---
    { value: 'professional', label: 'Professional', category: 'Usage', popular: true },
    { value: 'personal', label: 'Personal', category: 'Usage', popular: true },
    { value: 'education', label: 'Education', category: 'Usage' },
    { value: 'gaming', label: 'Gaming', category: 'Usage' },
    { value: 'content-creation', label: 'Content Creation', category: 'Usage' },
    { value: 'remote-work', label: 'Remote Work', category: 'Usage' },
    { value: 'streaming', label: 'Streaming', category: 'Usage' },

    // --- Performance Level ---
    { value: 'entry-level', label: 'Entry Level', category: 'Performance', popular: true },
    { value: 'mid-tier', label: 'Mid-Tier', category: 'Performance' },
    { value: 'high-performance', label: 'High Performance', category: 'Performance', popular: true },
    { value: 'ultra-performance', label: 'Ultra Performance', category: 'Performance' },

    // --- Developer Focus ---
    { value: 'ai-focused', label: 'AI Focused', category: 'Developer Focus', popular: true },
    { value: 'vibe-coding', label: 'Vibe Coding', category: 'Developer Focus', popular: true },
    { value: 'full-stack', label: 'Full Stack', category: 'Developer Focus' },
    { value: 'front-end', label: 'Front End', category: 'Developer Focus' },
    { value: 'back-end', label: 'Back End', category: 'Developer Focus' },
    { value: 'mobile-dev', label: 'Mobile Development', category: 'Developer Focus' },
    { value: 'devops', label: 'DevOps', category: 'Developer Focus' },
    { value: 'data-science', label: 'Data Science', category: 'Developer Focus' },
    { value: 'security', label: 'Security', category: 'Developer Focus' },
    { value: 'testing', label: 'Testing', category: 'Developer Focus' },

    // --- Features ---
    { value: 'portable', label: 'Portable', category: 'Features', popular: true },
    { value: 'ergonomic', label: 'Ergonomic', category: 'Features', popular: true },
    { value: 'wireless', label: 'Wireless', category: 'Features' },
    { value: 'durable', label: 'Durable', category: 'Features' },
    { value: 'customizable', label: 'Customizable', category: 'Features' },
    { value: 'multi-platform', label: 'Multi-Platform', category: 'Features' },
    { value: 'eco-friendly', label: 'Eco-Friendly', category: 'Features' },
    { value: 'open-source', label: 'Open Source', category: 'Features' },
    { value: 'free-tier', label: 'Free Tier', category: 'Features' },
    { value: 'subscription', label: 'Subscription', category: 'Features' },
    { value: 'one-time-purchase', label: 'One-Time Purchase', category: 'Features' },
  ];
};