<html><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Space+Grotesk%3Awght%40400%3B500%3B700" onload="this.rel='stylesheet'" rel="stylesheet"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
      :root {
        --primary-50: #f4e8ff;
        --primary-100: #e9d1ff;
        --primary-200: #d8b4ff;
        --primary-300: #c28fff;
        --primary-400: #a968ff;
        --primary-500: #8c3fff;
        --primary-600: #7f13ec;
        --primary-700: #6709c8;
        --primary-800: #51069f;
        --primary-900: #420483;
        --primary-950: #290259;
      }
      .neon-glow {
        box-shadow: 0 0 5px var(--primary-500), 0 0 10px var(--primary-600), 0 0 15px var(--primary-700);
      }
      .neon-text {
        text-shadow: 0 0 2px var(--primary-200), 0 0 5px var(--primary-400), 0 0 10px var(--primary-500);
      }
    </style>
</head>
<body class="relative flex h-auto min-h-screen w-full flex-col bg-[#0d0714] dark group/design-root overflow-x-hidden" style='font-family: "Space Grotesk", "Noto Sans", sans-serif;'>
<div class="layout-container flex h-full grow flex-col">
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#290259] px-10 py-4 shadow-lg shadow-[#0d0714]/50">
<div class="flex items-center gap-8">
<div class="flex items-center gap-4 text-[var(--primary-300)]">
<div class="size-6 neon-glow rounded-full">
<svg class="neon-text" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
</svg>
</div>
<h2 class="text-white text-xl font-bold leading-tight tracking-[-0.015em] neon-text">Vibe Code</h2>
</div>
<nav class="flex items-center gap-9">
<a class="text-white/80 hover:text-white hover:neon-text transition-all duration-300 text-sm font-medium leading-normal" href="#">Home</a>
<a class="text-white/80 hover:text-white hover:neon-text transition-all duration-300 text-sm font-medium leading-normal" href="#">Projects</a>
<a class="text-white/80 hover:text-white hover:neon-text transition-all duration-300 text-sm font-medium leading-normal" href="#">Lounge</a>
<a class="text-white/80 hover:text-white hover:neon-text transition-all duration-300 text-sm font-medium leading-normal" href="#">Reviews</a>
</nav>
</div>
<div class="flex flex-1 justify-end gap-6 items-center">
<label class="flex flex-col min-w-40 !h-10 max-w-64">
<div class="flex w-full flex-1 items-stretch rounded-md h-full">
<div class="text-[var(--primary-300)] flex border border-r-0 border-[var(--primary-800)] bg-[#1a1122] items-center justify-center pl-3 rounded-l-md" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
</svg>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white/90 focus:outline-0 focus:ring-2 focus:ring-[var(--primary-600)] border border-[var(--primary-800)] bg-[#1a1122] h-full placeholder:text-[var(--primary-300)]/60 px-3 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search" value=""/>
</div>
</label>
<a class="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 w-10 bg-[#1a1122] border border-[var(--primary-800)] text-[var(--primary-300)] hover:bg-[var(--primary-900)] hover:border-[var(--primary-700)] hover:text-white transition-all duration-300" href="#">
<div class="text-current" data-icon="Bell" data-size="20px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
</svg>
</div>
<span class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-400)] opacity-75"></span>
<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--primary-500)]"></span>
</span>
</a>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[var(--primary-700)] neon-glow" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvZEfhBYKbFTFicM9GXhGKozsfG59CORp8em29rjEt4bBwnPAEzj6Qko23TmA1KhYsqNZIoLf-Uketgb7nQ6YtyThnarypSVDsQ5FwagF05byAHVeNvetONMF7ISVbVkE7ECLBPuL-Ed4Z-UFltl1VE0ypmFlA1PNn9YmmG5U5qgtMJYrBYE6d7bnLj9dD0W18y6EYMfV_2w9U466k7dQul31l0VBenZ4Ps3sXfDhr3BZk5DgKeCI3xFm3LZ5r7FVEePQReNgPEdM");'></div>
</div>
</header>
<main class="flex flex-1 justify-center py-10 px-4 sm:px-10 md:px-20 lg:px-40">
<div class="layout-content-container flex flex-col max-w-4xl flex-1 gap-8 w-full">
<div class="flex flex-col gap-6">
<div class="flex justify-between items-center px-2">
<h1 class="text-3xl font-bold text-white neon-text">Notifications</h1>
<div class="flex items-center gap-4">
<button class="text-sm font-medium text-[var(--primary-300)] hover:text-white transition-colors duration-300">Mark all as read</button>
<button class="text-sm font-medium text-[var(--primary-300)] hover:text-white transition-colors duration-300">Settings</button>
</div>
</div>
<div class="flex flex-col bg-[#11091a] border border-[var(--primary-900)] rounded-lg shadow-lg shadow-black/30">
<ul class="divide-y divide-[var(--primary-900)]">
<li class="p-4 flex items-start gap-4 hover:bg-[#1a1122]/50 transition-colors duration-200 cursor-pointer relative">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-500)] neon-glow rounded-l-lg"></div>
<div class="flex-shrink-0">
<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--primary-700)]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFHl1_5JjifKk1K-1tXnFPA11nNmqaxr3g1sU3Ld88rWfFpB5S0pqg8PBlL2oJbI0uNlQ2x2F6eJpYh-lFpC3q3R4pE0r-V0qZ-5n4Q-3Q")'></div>
</div>
<div class="flex-1">
<p class="text-white"><strong class="font-semibold neon-text">Kai</strong> left a Vibe Check on your project <strong class="font-semibold text-[var(--primary-300)]">Project Neon City</strong>.</p>
<p class="text-sm text-[var(--primary-300)]/70 mt-1">2 minutes ago</p>
</div>
</li>
<li class="p-4 flex items-start gap-4 hover:bg-[#1a1122]/50 transition-colors duration-200 cursor-pointer relative">
<div class="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary-500)] neon-glow rounded-l-lg"></div>
<div class="flex-shrink-0">
<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--primary-700)]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCy-p4eQ8bZ4d8p1Q-9c7Fp7o5o5Z5-6n4j2k-g5n7r2s3o-1i-p3Q4o2r3s5t7u9v0w-1x2y3z4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z")'></div>
</div>
<div class="flex-1">
<p class="text-white"><strong class="font-semibold neon-text">Ryo</strong> commented on your post in the <strong class="font-semibold text-[var(--primary-300)]">Lounge</strong>.</p>
<p class="text-sm text-[var(--primary-300)]/70 mt-1">15 minutes ago</p>
</div>
</li>
<li class="p-4 flex items-start gap-4 hover:bg-[#1a1122]/50 transition-colors duration-200 cursor-pointer">
<div class="flex-shrink-0">
<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--primary-800)]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-8d3g7j4k1m6n9q2s5u8x-a-c-e-g-i-k-m-o-q-s-u-w-y-0-2-4-6-8-A-C-E-G-I-K-M-O-Q-S-U-W-Y-0")'></div>
</div>
<div class="flex-1">
<p class="text-white/70">A new project <strong class="font-semibold text-[var(--primary-400)]/80">Cybernetic Dreams</strong> was posted.</p>
<p class="text-sm text-[var(--primary-300)]/60 mt-1">1 hour ago</p>
</div>
</li>
<li class="p-4 flex items-start gap-4 hover:bg-[#1a1122]/50 transition-colors duration-200 cursor-pointer">
<div class="flex-shrink-0">
<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--primary-800)]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA-z-y-x-w-v-u-t-s-r-q-p-o-n-m-l-k-j-i-h-g-f-e-d-c-b-a-9-8-7-6-5-4-3-2-1-0-Z-Y-X")'></div>
</div>
<div class="flex-1">
<p class="text-white/70"><strong class="font-semibold text-white/90">Zero</strong> replied to your comment in the <strong class="font-semibold text-[var(--primary-400)]/80">Lounge</strong>.</p>
<p class="text-sm text-[var(--primary-300)]/60 mt-1">3 hours ago</p>
</div>
</li>
<li class="p-4 flex items-start gap-4 hover:bg-[#1a1122]/50 transition-colors duration-200 cursor-pointer">
<div class="flex-shrink-0">
<div class="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[var(--primary-800)]" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_9c8d7e6f5g4h3i2j1k0l-m-n-o-p-q-r-s-t-u-v-w-x-y-z-a-b-c-d-e-f-g-h-i-j-k-l-m")'></div>
</div>
<div class="flex-1">
<p class="text-white/70">Your project <strong class="font-semibold text-[var(--primary-400)]/80">Cyberpunk UI Kit</strong> received a new review.</p>
<p class="text-sm text-[var(--primary-300)]/60 mt-1">1 day ago</p>
</div>
</li>
</ul>
</div>
</div>
</div>
</main>
</div>
</body></html>