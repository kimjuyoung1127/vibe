// app/projects/create/data/projectTaglines.ts
// Project Tagline options based on sw.md

import { ProjectTagline, ProjectTaglineCategory } from '../types';

/**
 * Tagline (slogan) candidate list that users can select when creating a project
 * Expanded significantly with Vibe coding sensibility.
 */
export const projectTaglines: ProjectTagline[] = [
  // --- Innovation/Novelty ---
  { id: 'cutting_edge_sol', text: 'projects.taglines.cutting_edge_sol', category: 'innovation', emoji: '🚀', color: 'bg-indigo-500' },
  { id: 'new_experience', text: 'projects.taglines.new_experience', category: 'innovation', icon: 'explore', color: 'bg-purple-500' },
  { id: 'breaking_ground', text: 'projects.taglines.breaking_ground', category: 'innovation', icon: 'auto_awesome', color: 'bg-pink-500' },
  { id: 'game_changer', text: 'projects.taglines.game_changer', category: 'innovation', icon: 'military_tech', color: 'bg-rose-600' },
  { id: 'next_gen_vibe', text: 'projects.taglines.next_gen_vibe', category: 'innovation', icon: 'display_settings', color: 'bg-fuchsia-600' },
  { id: 'ai_partner', text: 'projects.taglines.ai_partner', category: 'innovation', icon: 'smart_toy', color: 'bg-teal-500' },

  // --- Developer Experience (DX) ---
  { id: 'happy_developer', text: 'projects.taglines.happy_developer', category: 'dx', icon: 'sentiment_very_satisfied', color: 'bg-sky-500' },
  { id: 'dx_first', text: 'projects.taglines.dx_first', category: 'dx', icon: 'engineering', color: 'bg-blue-500' },
  { id: 'less_complexity', text: 'projects.taglines.less_complexity', category: 'dx', icon: 'insights', color: 'bg-cyan-500' },
  { id: 'simple_code_infinite_experience', text: 'projects.taglines.simple_code_infinite_experience', category: 'dx', icon: 'all_inclusive', color: 'bg-indigo-400' },

  // --- Robust & Reliable ---
  { id: 'built_to_last', text: 'projects.taglines.built_to_last', category: 'robustness', icon: 'verified', color: 'bg-green-600' },
  { id: 'type_safe', text: 'projects.taglines.type_safe', category: 'robustness', icon: 'security', color: 'bg-emerald-600' },
  { id: 'fewer_bugs_more_trust', text: 'projects.taglines.fewer_bugs_more_trust', category: 'robustness', icon: 'bug_report', color: 'bg-lime-700' },
  { id: 'rock_solid', text: 'projects.taglines.rock_solid', category: 'robustness', icon: 'foundation', color: 'bg-green-500' },

  // --- Utility/Practicality ---
  { id: 'everyday_problem', text: 'projects.taglines.everyday_problem', category: 'utility', icon: 'handyman', color: 'bg-green-500' },
  { id: 'essential_utility', text: 'projects.taglines.essential_utility', category: 'utility', icon: 'build', color: 'bg-teal-500' },
  { id: 'boost_productivity', text: 'projects.taglines.boost_productivity', category: 'efficiency', icon: 'trending_up', color: 'bg-blue-500' },
  { id: 'life_saver_dev', text: 'projects.taglines.life_saver_dev', category: 'utility', icon: 'volunteer_activism', color: 'bg-lime-600' },

  // --- Design/Aesthetics ---
  { id: 'visual_masterpiece', text: 'projects.taglines.visual_masterpiece', category: 'design', icon: 'palette', color: 'bg-red-400' },
  { id: 'eye_candy_code', text: 'projects.taglines.eye_candy_code', category: 'design', icon: 'favorite', color: 'bg-orange-400' },
  { id: 'pixel_perfection', text: 'projects.taglines.pixel_perfection', category: 'design', icon: 'crop_free', color: 'bg-amber-400' },
  { id: 'clean_design_bold_code', text: 'projects.taglines.clean_design_bold_code', category: 'design', icon: 'design_services', color: 'bg-cyan-500' },

  // --- Community/Collaboration ---
  { id: 'dev_together', text: 'projects.taglines.dev_together', category: 'community', emoji: '🤝', color: 'bg-cyan-500' },
  { id: 'collab_platform', text: 'projects.taglines.collab_platform', category: 'community', icon: 'group', color: 'bg-lime-500' },
  { id: 'open_source_spirit', text: 'projects.taglines.open_source_spirit', category: 'community', icon: 'public', color: 'bg-emerald-500' },

  // --- Retro Vibe ---
  { id: 'nostalgia_meets_future', text: 'projects.taglines.nostalgia_meets_future', category: 'retroVibe', icon: 'videogame_asset', color: 'bg-yellow-500' },
  { id: 'pixel_perfect_modern', text: 'projects.taglines.pixel_perfect_modern', category: 'retroVibe', icon: 'style', color: 'bg-rose-500' },
  { id: '8bit_glitch', text: 'projects.taglines.8bit_glitch', category: 'retroVibe', icon: 'memory', color: 'bg-purple-400' },
  { id: 'vintage_tech_new_features', text: 'projects.taglines.vintage_tech_new_features', category: 'retroVibe', icon: 'headphones', color: 'bg-orange-500' },

  // --- Efficiency/Simplicity ---
  { id: 'simple_powerful', text: 'projects.taglines.simple_powerful', category: 'simplicity', emoji: '✨', color: 'bg-gray-500' },
  { id: 'effortless_efficiency', text: 'projects.taglines.effortless_efficiency', category: 'efficiency', icon: 'bolt', color: 'bg-fuchsia-500' },
  { id: 'less_code_more_vibe', text: 'projects.taglines.less_code_more_vibe', category: 'simplicity', icon: 'compress', color: 'bg-gray-600' },
  { id: 'creative_coding', text: 'projects.taglines.creative_coding', category: 'efficiency', icon: 'auto_fix_high', color: 'bg-purple-500' },

  // --- Fun/Personality ---
  { id: 'just_for_fun', text: 'projects.taglines.just_for_fun', category: 'fun', emoji: '🎉', color: 'bg-red-300' },
  { id: 'my_own_vibe', text: 'projects.taglines.my_own_vibe', category: 'fun', icon: 'celebration', color: 'bg-yellow-300' },
  { id: 'passion_project', text: 'projects.taglines.passion_project', category: 'fun', icon: 'favorite_border', color: 'bg-pink-300' },
  { id: 'coding_is_art', text: 'projects.taglines.coding_is_art', category: 'fun', icon: 'brush', color: 'bg-purple-300' },

  // --- Challenge/Growth ---
  { id: 'my_first_project', text: 'projects.taglines.my_first_project', category: 'challenge', icon: 'star_border', color: 'bg-blue-300' },
  { id: 'level_up_code', text: 'projects.taglines.level_up_code', category: 'challenge', icon: 'auto_awesome_mosaic', color: 'bg-green-300' },
  { id: 'pushing_limits', text: 'projects.taglines.pushing_limits', category: 'challenge', icon: 'rocket', color: 'bg-orange-300' },

  // --- Meme/Wit ---
  { id: 'it_works_on_my_machine', text: 'projects.taglines.it_works_on_my_machine', category: 'meme', emoji: '🤔', color: 'bg-gray-400' },
  { id: 'stack_overflow_fueled', text: 'projects.taglines.stack_overflow_fueled', category: 'meme', icon: 'forum', color: 'bg-blue-400' },
  { id: 'rubber_duck_approved', text: 'projects.taglines.rubber_duck_approved', category: 'meme', emoji: '🦆', color: 'bg-teal-400' },
  { id: 'bug_free_maybe', text: 'projects.taglines.bug_free_maybe', category: 'meme', emoji: '🐞', color: 'bg-red-200' },
  { id: 'git_blame_proof', text: 'projects.taglines.git_blame_proof', category: 'meme', icon: 'code_blocks', color: 'bg-pink-200' },
];
