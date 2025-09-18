<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Vibe Code - Gear Reviews</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&amp;family=VT323&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
        :root {
            --primary-color: #8013ec;
            --secondary-color: #ad92c9;
            --background-color: #1a1122;
            --surface-color: #2c1a3b;
            --border-color: #362348;
            --neon-pink: #f0f;
        }
        .font-retro {
            font-family: 'VT323', monospace;
        }
        .font-modern {
            font-family: 'Space Grotesk', sans-serif;
        }
        .text-shadow-neon {
            text-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 15px var(--primary-color), 0 0 20px var(--primary-color);
        }
        .text-shadow-neon-pink {
            text-shadow: 0 0 5px var(--neon-pink), 0 0 10px var(--neon-pink), 0 0 15px var(--neon-pink);
        }
        .review-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border: 1px solid var(--border-color);
        }
        .review-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 15px rgba(255, 0, 255, 0.5), 0 0 30px rgba(255, 0, 255, 0.3);
        }
        .review-title-neon {
            transition: text-shadow 0.3s ease-in-out;
        }
        .review-card:hover .review-title-neon {
            text-shadow: 0 0 3px #fff, 0 0 5px var(--neon-pink), 0 0 8px var(--neon-pink);
        }
        .filter-btn {
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
        }
        .filter-btn:hover, .filter-btn.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
        }
        .star-rating .material-symbols-outlined {
            color: var(--secondary-color);
            font-variation-settings: 'FILL' 0;
            transition: all 0.2s ease;
        }
        .star-rating .material-symbols-outlined.filled {
             color: var(--neon-pink);
             text-shadow: 0 0 5px var(--neon-pink);
             font-variation-settings: 'FILL' 1;
        }
    </style>
</head>
<body class="bg-[var(--background-color)] text-white font-modern">
<div class="relative min-h-screen w-full flex-col overflow-x-hidden p-4 md:p-8">
<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
<div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
<header class="relative z-10 flex items-center justify-between mb-12">
<div class="flex items-center gap-4">
<svg class="text-[var(--primary-color)] h-12 w-12" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
</svg>
<h1 class="text-4xl font-bold tracking-tighter font-retro text-shadow-neon">Vibe Code</h1>
</div>
<nav class="hidden md:flex items-center gap-6 text-lg font-retro text-[var(--secondary-color)]">
<a class="hover:text-white hover:text-shadow-neon transition-all" href="#">Home</a>
<a class="text-white text-shadow-neon" href="#">Gear Reviews</a>
<a class="hover:text-white hover:text-shadow-neon transition-all" href="#">Projects</a>
<a class="hover:text-white hover:text-shadow-neon transition-all" href="#">Community</a>
</nav>
</header>
<main class="relative z-10 max-w-7xl mx-auto">
<div class="text-center mb-12">
<h2 class="text-5xl md:text-6xl font-retro text-shadow-neon">Gear Reviews</h2>
<p class="text-xl text-[var(--secondary-color)] mt-4 max-w-3xl mx-auto">Real-world reviews of the tools, tech, and hardware that power our code. No fluff, just facts from the community.</p>
</div>
<div class="mb-12 flex flex-wrap justify-center gap-4 font-retro text-lg">
<button class="filter-btn active px-6 py-2 rounded-md">All</button>
<button class="filter-btn px-6 py-2 rounded-md">IDEs</button>
<button class="filter-btn px-6 py-2 rounded-md">Frameworks</button>
<button class="filter-btn px-6 py-2 rounded-md">Hardware</button>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">VS Code vs. Zed: 2024 Showdown</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">IDEs</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 4.5/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star_half</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(4.5/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">Is the new Rust-based editor a true contender? We compare performance, extensions, and the overall developer experience.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@glitch_coder</a></span>
<span class="mx-2">|</span>
<span>May 20, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">Keychron Q1 Pro: A Coder's Dream?</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">Hardware</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 5/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(5/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">We put the popular mechanical keyboard through its paces. An in-depth look at build quality, switch feel, and programmability.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@cyber_type</a></span>
<span class="mx-2">|</span>
<span>May 18, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">SvelteKit vs. Next.js: The Verdict</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">Frameworks</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 4/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined">star</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(4/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">Performance, developer experience, and ecosystem. A comprehensive comparison for your next web project.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@syntax_sorcerer</a></span>
<span class="mx-2">|</span>
<span>May 15, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">Logitech MX Master 3S Review</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">Hardware</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 4.5/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star_half</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(4.5/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">The king of productivity mice? We analyze ergonomics, customization, and whether it's worth the premium price tag for developers.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@pixel_pioneer</a></span>
<span class="mx-2">|</span>
<span>May 12, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">Is Astro the Future of Content Sites?</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">Frameworks</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 4/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined">star</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(4/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">Exploring the island architecture of Astro and its impact on performance and SEO. A must-read for blog and portfolio builders.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@dev_daemon</a></span>
<span class="mx-2">|</span>
<span>May 10, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
<div class="review-card bg-[var(--surface-color)] rounded-lg overflow-hidden group flex flex-col">
<div class="p-6 flex-grow">
<div class="flex justify-between items-start mb-2">
<h3 class="text-2xl font-bold font-retro text-[var(--neon-pink)] review-title-neon">Dell UltraSharp 4K Monitor Test</h3>
<span class="font-retro text-sm bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-1 rounded">Hardware</span>
</div>
<div class="flex items-center gap-1 mb-4 star-rating" title="Rating: 5/5">
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="material-symbols-outlined filled">star</span>
<span class="text-sm text-[var(--secondary-color)] ml-2">(5/5)</span>
</div>
<p class="text-[var(--secondary-color)] font-modern text-base leading-relaxed">More screen real estate, more code. A detailed review of the U2723QE's color accuracy, connectivity, and value for coders.</p>
</div>
<div class="p-6 bg-black/20 border-t border-[var(--border-color)] flex justify-between items-center">
<div class="text-sm text-[var(--secondary-color)]">
<span>By <a class="text-white hover:text-[var(--neon-pink)] transition" href="#">@cathode_ray</a></span>
<span class="mx-2">|</span>
<span>May 08, 2024</span>
</div>
<a class="font-retro text-[var(--neon-pink)] hover:text-white transition-all" href="#">Read More &gt;</a>
</div>
</div>
</div>
</main>
<footer class="relative z-10 mt-24 text-center text-xs text-[var(--secondary-color)]/50">
<p>© 2024 Vibe Code. All rights reserved. System online.</p>
</footer>
</div>

</body></html>