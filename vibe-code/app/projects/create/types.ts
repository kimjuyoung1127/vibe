// app/projects/create/types.ts
// Type definitions for project creation form

/**
 * Generic interface for selectable tag options used in dropdowns or button groups.
 * Provides a base structure that can be extended by specific tag types.
 */
export interface TagOption {
  id: string; // Unique identifier for the tag
  text: string; // Display text for the tag
  emoji?: string; // Optional emoji to display with the tag
  icon?: string; // Optional icon name (for Material Symbols or similar)
  color?: string; // Optional color class for styling (e.g., 'bg-red-500')
}

/**
 * Project Tagline category type (for internal management and filtering)
 */
export type ProjectTaglineCategory = 'innovation' | 'utility' | 'design' | 'community' | 'retroVibe' | 'efficiency' | 'simplicity' | 'fun' | 'challenge' | 'meme' | 'dx' | 'robustness';  

/**
 * Extended interface for Project Tagline options
 */
export interface ProjectTagline extends TagOption {
  category: ProjectTaglineCategory; // Category representing the main characteristic of the tagline
}