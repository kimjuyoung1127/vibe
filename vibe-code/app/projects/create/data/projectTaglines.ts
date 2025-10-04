// app/projects/create/data/projectTaglines.ts
// Project Tagline options based on sw.md

import { ProjectTagline, ProjectTaglineCategory } from '../types';

/**
 * Tagline (slogan) candidate list that users can select when creating a project
 * Expanded significantly with Vibe coding sensibility.
 */
export const projectTaglines: ProjectTagline[] = [
  // --- Innovation/Novelty ---
  { id: 'cutting_edge_sol', text: 'Coding the future, cutting-edge solution.', category: 'innovation', emoji: '🚀', color: 'bg-indigo-500' },
  { id: 'new_experience', text: 'A project that offers you a new experience.', category: 'innovation', icon: 'explore', color: 'bg-purple-500' },
  { id: 'breaking_ground', text: 'An innovative idea that breaks existing frameworks.', category: 'innovation', icon: 'auto_awesome', color: 'bg-pink-500' },
  { id: 'game_changer', text: 'My own rules that change the game.', category: 'innovation', icon: 'military_tech', color: 'bg-rose-600' },
  { id: 'next_gen_vibe', text: 'The next generation of Vibe starts here.', category: 'innovation', icon: 'display_settings', color: 'bg-fuchsia-600' },
  { id: 'ai_partner', text: 'AI partner that brings my ideas to life.', category: 'innovation', icon: 'smart_toy', color: 'bg-teal-500' },

  // --- Developer Experience (DX) ---
  { id: 'happy_developer', text: 'Code that makes developers happy.', category: 'dx', icon: 'sentiment_very_satisfied', color: 'bg-sky-500' },
  { id: 'dx_first', text: 'A project that prioritizes developer experience.', category: 'dx', icon: 'engineering', color: 'bg-blue-500' },
  { id: 'less_complexity', text: 'Lower complexity, higher productivity.', category: 'dx', icon: 'insights', color: 'bg-cyan-500' },
  { id: 'simple_code_infinite_experience', text: 'Simple code, infinite experience.', category: 'dx', icon: 'all_inclusive', color: 'bg-indigo-400' },

  // --- Robust & Reliable ---
  { id: 'built_to_last', text: 'Code built to last, with high maintainability.', category: 'robustness', icon: 'verified', color: 'bg-green-600' },
  { id: 'type_safe', text: 'Code safety protected by a strong type system.', category: 'robustness', icon: 'security', color: 'bg-emerald-600' },
  { id: 'fewer_bugs_more_trust', text: 'Fewer bugs, more trust.', category: 'robustness', icon: 'bug_report', color: 'bg-lime-700' },
  { id: 'rock_solid', text: 'A rock-solid project you can rely on.', category: 'robustness', icon: 'foundation', color: 'bg-green-500' },

  // --- Utility/Practicality ---
  { id: 'everyday_problem', text: 'Smart tools that solve everyday problems.', category: 'utility', icon: 'handyman', color: 'bg-green-500' },
  { id: 'essential_utility', text: 'Essential utility that transforms your workflow.', category: 'utility', icon: 'build', color: 'bg-teal-500' },
  { id: 'boost_productivity', text: 'Solutions that take productivity to the next level.', category: 'efficiency', icon: 'trending_up', color: 'bg-blue-500' },
  { id: 'life_saver_dev', text: 'Developer time, now I save it.', category: 'utility', icon: 'volunteer_activism', color: 'bg-lime-600' },

  // --- Design/Aesthetics ---
  { id: 'visual_masterpiece', text: 'Beautiful UI/UX, visual masterpiece.', category: 'design', icon: 'palette', color: 'bg-red-400' },
  { id: 'eye_candy_code', text: 'Code that adds viewing pleasure, captivating to the eye.', category: 'design', icon: 'favorite', color: 'bg-orange-400' },
  { id: 'pixel_perfection', text: 'Perfect aesthetics, down to the pixel.', category: 'design', icon: 'crop_free', color: 'bg-amber-400' },
  { id: 'clean_design_bold_code', text: 'Clean design, bold code.', category: 'design', icon: 'design_services', color: 'bg-cyan-500' },

  // --- Community/Collaboration ---
  { id: 'dev_together', text: 'Hub for connection and sharing for developers.', category: 'community', emoji: '🤝', color: 'bg-cyan-500' },
  { id: 'collab_platform', text: 'A place for collaborative growth.', category: 'community', icon: 'group', color: 'bg-lime-500' },
  { id: 'open_source_spirit', text: 'The spirit of open source for everyone.', category: 'community', icon: 'public', color: 'bg-emerald-500' },

  // --- Retro Vibe ---
  { id: 'nostalgia_meets_future', text: 'Retro code running toward the future, dressed in nostalgia.', category: 'retroVibe', icon: 'videogame_asset', color: 'bg-yellow-500' },
  { id: 'pixel_perfect_modern', text: 'Modern projects implemented with pixel art sensibility.', category: 'retroVibe', icon: 'style', color: 'bg-rose-500' },
  { id: '8bit_glitch', text: '8-bit sensibility, but without bugs.', category: 'retroVibe', icon: 'memory', color: 'bg-purple-400' },
  { id: 'vintage_tech_new_features', text: 'New features with vintage technology.', category: 'retroVibe', icon: 'headphones', color: 'bg-orange-500' },

  // --- Efficiency/Simplicity ---
  { id: 'simple_powerful', text: 'Simple but powerful functionality.', category: 'simplicity', emoji: '✨', color: 'bg-gray-500' },
  { id: 'effortless_efficiency', text: 'Maximum efficiency with minimal effort.', category: 'efficiency', icon: 'bolt', color: 'bg-fuchsia-500' },
  { id: 'less_code_more_vibe', text: 'Less code, bigger vibe.', category: 'simplicity', icon: 'compress', color: 'bg-gray-600' },
  { id: 'creative_coding', text: 'Repetitive tasks for AI, creative coding for me.', category: 'efficiency', icon: 'auto_fix_high', color: 'bg-purple-500' },

  // --- Fun/Personality ---
  { id: 'just_for_fun', text: 'Just started for fun, but I can\'t stop!', category: 'fun', emoji: '🎉', color: 'bg-red-300' },
  { id: 'my_own_vibe', text: 'My own vibe, my own way of coding.', category: 'fun', icon: 'celebration', color: 'bg-yellow-300' },
  { id: 'passion_project', text: 'My precious project driven by passion.', category: 'fun', icon: 'favorite_border', color: 'bg-pink-300' },
  { id: 'coding_is_art', text: 'Coding is art to me.', category: 'fun', icon: 'brush', color: 'bg-purple-300' },

  // --- Challenge/Growth ---
  { id: 'my_first_project', text: 'Nervous, my first attempt.', category: 'challenge', icon: 'star_border', color: 'bg-blue-300' },
  { id: 'level_up_code', text: 'Growth story of trial and error for skill-up.', category: 'challenge', icon: 'auto_awesome_mosaic', color: 'bg-green-300' },
  { id: 'pushing_limits', text: 'The thrill of challenging limits!', category: 'challenge', icon: 'rocket', color: 'bg-orange-300' },

  // --- Meme/Wit ---
  { id: 'it_works_on_my_machine', text: 'It works on my machine, right?', category: 'meme', emoji: '🤔', color: 'bg-gray-400' },
  { id: 'stack_overflow_fueled', text: 'A project grown by Stack Overflow.', category: 'meme', icon: 'forum', color: 'bg-blue-400' },
  { id: 'rubber_duck_approved', text: 'Final approval from Mr. Rubber Duck.', category: 'meme', emoji: '🦆', color: 'bg-teal-400' },
  { id: 'bug_free_maybe', text: 'No bugs... maybe?', category: 'meme', emoji: '🐞', color: 'bg-red-200' },
  { id: 'git_blame_proof', text: 'Code free from Git blame.', category: 'meme', icon: 'code_blocks', color: 'bg-pink-200' },
];
