<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Vibe Code - Community</title>
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
            --neon-cyan: #0ff;
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
         .text-shadow-neon-cyan {
            text-shadow: 0 0 3px var(--neon-cyan), 0 0 5px var(--neon-cyan), 0 0 8px var(--neon-cyan);
        }
        .thread-card {
            border: 1px solid var(--border-color);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .thread-card:hover {
            border-color: var(--neon-pink);
            box-shadow: 0 0 15px rgba(255, 0, 255, 0.3);
        }
        .post-input {
            background-color: #1c102a;
            border: 1px solid var(--border-color);
            color: var(--secondary-color);
            transition: all 0.3s ease;
        }
        .post-input:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 10px var(--primary-color);
            background-color: var(--surface-color);
        }
        .btn-primary {
            background-color: var(--primary-color);
            color: white;
            border: 1px solid var(--primary-color);
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            box-shadow: 0 0 15px var(--primary-color);
            background-color: color-mix(in srgb, var(--primary-color) 90%, white);
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
<a class="hover:text-white hover:text-shadow-neon transition-all" href="#">Gear Reviews</a>
<a class="hover:text-white hover:text-shadow-neon transition-all" href="#">Projects</a>
<a class="text-white text-shadow-neon" href="#">Community</a>
</nav>
</header>
<main class="relative z-10 max-w-5xl mx-auto">
<div class="text-center mb-12">
<h2 class="text-5xl md:text-6xl font-retro text-shadow-neon">The Grid</h2>
<p class="text-xl text-[var(--secondary-color)] mt-4 max-w-3xl mx-auto">A free-form space for the community. Share your thoughts, ask questions, or just hang out.</p>
</div>
<div class="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-lg p-6 mb-8">
<h3 class="font-retro text-2xl text-[var(--neon-cyan)] text-shadow-neon-cyan mb-4">Start a New Discussion &gt;&gt;</h3>
<textarea class="w-full p-4 rounded-md post-input font-modern text-base" placeholder="What's on your mind, developer?"></textarea>
<div class="flex justify-end mt-4">
<button class="btn-primary font-retro px-8 py-2 rounded-md flex items-center gap-2">
<span class="material-symbols-outlined">send</span>
Post
</button>
</div>
</div>
<div class="space-y-6">
<div class="thread-card bg-[var(--surface-color)] rounded-lg p-6">
<div class="flex items-start gap-4">
<img alt="Avatar of glitch_coder" class="h-12 w-12 rounded-full border-2 border-[var(--primary-color)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHbikFONo1Rz5GndBoQVAQ7oV2p7vAdboPuMGfVyrmqhEu7JPPxmVwAVMIPk2qo6rWO5jRh-dfmuxz28XuSi8wy94Kyncq5uJShcjtcHN2WQPkqM6hlPp4_FDsiVm4vBGbpwKC9rzeujt4h2IAD8cXv0kdFbTmEKDDzOeb6OhnDejS9t-Be8rIbvMHD3hQQYpu6sFasiWkyzU_-K0ij3nR5XTPP-9rqFh1ygA9LGYR1TV85rezhQY6txj1g9c4Nce36Pd2ojuGmRU"/>
<div class="flex-1">
<div class="flex justify-between items-center mb-2">
<p class="font-bold text-lg text-[var(--neon-pink)]">
<a class="hover:underline" href="#">@glitch_coder</a>
<span class="text-sm font-modern text-[var(--secondary-color)] ml-2">posted 2 hours ago</span>
</p>
<div class="flex items-center gap-4 text-[var(--secondary-color)] font-retro">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">forum</span> 12</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">visibility</span> 142</span>
</div>
</div>
<h3 class="text-xl font-bold font-modern text-white mb-3">
<a class="hover:text-[var(--neon-cyan)] transition-colors" href="#">Show me your terminal setup! What's your go-to shell and prompt?</a>
</h3>
<p class="text-[var(--secondary-color)] leading-relaxed">I'm currently running zsh with Oh My Zsh and the Powerlevel10k theme. It's solid, but I'm always curious to see what other people are using. Any hidden gems out there for prompts or useful plugins?</p>
</div>
</div>
</div>
<div class="thread-card bg-[var(--surface-color)] rounded-lg p-6">
<div class="flex items-start gap-4">
<img alt="Avatar of syntax_sorcerer" class="h-12 w-12 rounded-full border-2 border-[var(--primary-color)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4VxxVR1-TOKH7FzYXOujG-HjqJ27RqLItfOoZjCvwjoNJz55NqCk_asrIcRUXrlK-fw6FRS9uE5R2oEsn5jIa2QghuY6enZ-IjGEFXAXUJ2xVF-SKegR9O00MXKVrOIdBESKt1BwlJ28eNc4bPWFyKHPWsA9ST-RVtyXyvZLbtIlv3SeijHpuUwgK9M-B_0TZ02CWO4jrzBu9yg2OrC-HYB0LXOxGEdJwUrviV5Ld5Med71Y02yhSdzPgfdCMRL7ywDiysM9kOVA"/>
<div class="flex-1">
<div class="flex justify-between items-center mb-2">
<p class="font-bold text-lg text-[var(--neon-pink)]">
<a class="hover:underline" href="#">@syntax_sorcerer</a>
<span class="text-sm font-modern text-[var(--secondary-color)] ml-2">posted 8 hours ago</span>
</p>
<div class="flex items-center gap-4 text-[var(--secondary-color)] font-retro">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">forum</span> 28</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">visibility</span> 310</span>
</div>
</div>
<h3 class="text-xl font-bold font-modern text-white mb-3">
<a class="hover:text-[var(--neon-cyan)] transition-colors" href="#">Hot take: CSS is the most underrated programming language. Change my mind.</a>
</h3>
<p class="text-[var(--secondary-color)] leading-relaxed">With container queries, has(), and all the new color functions, modern CSS is incredibly powerful. I feel like it doesn't get the respect it deserves from the "pure" programming crowd. What do you think?</p>
</div>
</div>
</div>
<div class="thread-card bg-[var(--surface-color)] rounded-lg p-6">
<div class="flex items-start gap-4">
<img alt="Avatar of cyber_type" class="h-12 w-12 rounded-full border-2 border-[var(--primary-color)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvpGqlyei7p00oZVsHls0a095rZl90m1xDStbL9FxMJBA2p_Z-6-XAh3lysvuVDi4QkXATsnLZxGCyLfep8K0oRkkGePXScy2cTvjiv6moQSmADtbChwIT12La-ZAWcMzCX92IW-Wa7ay0cYHcENIrpOyQ9Pnxxde5OFV01NcIjU099n_1czvj5ptPJZNmZ1MMT5hXGy56afzRHtQffFNsrXVekLfwIBRiw4hrI0gJTFYfR3wQ2NJNj9Af9OqY5HDAiyfzTyuprtQ"/>
<div class="flex-1">
<div class="flex justify-between items-center mb-2">
<p class="font-bold text-lg text-[var(--neon-pink)]">
<a class="hover:underline" href="#">@cyber_type</a>
<span class="text-sm font-modern text-[var(--secondary-color)] ml-2">posted yesterday</span>
</p>
<div class="flex items-center gap-4 text-[var(--secondary-color)] font-retro">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">forum</span> 5</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">visibility</span> 98</span>
</div>
</div>
<h3 class="text-xl font-bold font-modern text-white mb-3">
<a class="hover:text-[var(--neon-cyan)] transition-colors" href="#">What non-tech hobbies do you have that help you with coding?</a>
</h3>
<p class="text-[var(--secondary-color)] leading-relaxed">For me, it's playing music. The patterns, the practice, the creative problem solving... it all feels very connected to writing code. Curious to hear what other passions fuel your developer brains.</p>
</div>
</div>
</div>
</div>
</main>
<footer class="relative z-10 mt-24 text-center text-xs text-[var(--secondary-color)]/50">
<p>© 2024 Vibe Code. All rights reserved. System online.</p>
</footer>
</div>

</body></html>