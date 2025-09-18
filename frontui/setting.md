<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Space+Grotesk%3Awght%40400%3B500%3B700" onload="this.rel='stylesheet'" rel="stylesheet"/>
<title>Vibe Code - Settings</title>
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
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 28px;
        }
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #2c213a;
            -webkit-transition: .4s;
            transition: .4s;
            border: 1px solid var(--primary-800);
        }
        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: var(--primary-300);
            -webkit-transition: .4s;
            transition: .4s;
        }
        input:checked+.slider {
            background-color: var(--primary-700);
            box-shadow: 0 0 5px var(--primary-600);
        }
        input:checked+.slider:before {
             background-color: white;
            -webkit-transform: translateX(22px);
            -ms-transform: translateX(22px);
            transform: translateX(22px);
        }
        .slider.round {
            border-radius: 34px;
        }
        .slider.round:before {
            border-radius: 50%;
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
<div class="layout-content-container flex flex-col max-w-4xl flex-1 gap-12 w-full">
<h1 class="text-4xl font-bold text-white neon-text text-center">Settings</h1>
<div class="grid grid-cols-1 md:grid-cols-3 gap-10">
<div class="md:col-span-1">
<nav class="flex flex-col gap-2">
<a class="text-lg font-semibold text-[var(--primary-300)] neon-text py-2 px-4 border-l-4 border-[var(--primary-500)] bg-[#1a1122]/50" href="#account">Account</a>
<a class="text-lg font-medium text-white/70 hover:text-[var(--primary-300)] hover:bg-[#1a1122]/50 py-2 px-4 border-l-4 border-transparent hover:border-[var(--primary-500)] transition-all duration-200" href="#privacy">Privacy</a>
<a class="text-lg font-medium text-white/70 hover:text-[var(--primary-300)] hover:bg-[#1a1122]/50 py-2 px-4 border-l-4 border-transparent hover:border-[var(--primary-500)] transition-all duration-200" href="#notifications">Notifications</a>
<a class="text-lg font-medium text-white/70 hover:text-[var(--primary-300)] hover:bg-[#1a1122]/50 py-2 px-4 border-l-4 border-transparent hover:border-[var(--primary-500)] transition-all duration-200" href="#theme">Theme</a>
</nav>
</div>
<div class="md:col-span-2 flex flex-col gap-12">
<section class="flex flex-col gap-6 p-6 bg-[#11091a] border border-[var(--primary-900)] rounded-lg shadow-lg shadow-black/30" id="account">
<h2 class="text-2xl font-bold text-[var(--primary-300)] neon-text border-b border-[var(--primary-900)] pb-4">Account</h2>
<div class="flex items-center gap-6">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-24 border-4 border-[var(--primary-700)] neon-glow" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvZEfhBYKbFTFicM9GXhGKozsfG59CORp8em29rjEt4bBwnPAEzj6Qko23TmA1KhYsqNZIoLf-Uketgb7nQ6YtyThnarypSVDsQ5FwagF05byAHVeNvetONMF7ISVbVkE7ECLBPuL-Ed4Z-UFltl1VE0ypmFlA1PNn9YmmG5U5qgtMJYrBYE6d7bnLj9dD0W18y6EYMfV_2w9U466k7dQul31l0VBenZ4Ps3sXfDhr3BZk5DgKeCI3xFm3LZ5r7FVEePQReNgPEdM");'></div>
<div class="flex flex-col gap-2">
<button class="w-fit text-sm font-semibold bg-[var(--primary-600)] text-white px-4 py-2 rounded-md neon-glow hover:bg-[var(--primary-500)] transition-all duration-300">Upload New Photo</button>
<p class="text-xs text-white/60">Recommended: 256x256px, JPG, PNG, GIF</p>
</div>
</div>
<div class="flex flex-col gap-4">
<label class="flex flex-col gap-1.5 w-full">
<span class="text-sm font-medium text-[var(--primary-300)]">Username</span>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white/90 focus:outline-0 focus:ring-2 focus:ring-[var(--primary-600)] border border-[var(--primary-800)] bg-[#1a1122] h-10 placeholder:text-[var(--primary-300)]/60 px-3 text-sm font-normal leading-normal" value="NeoRider"/>
</label>
<label class="flex flex-col gap-1.5 w-full">
<span class="text-sm font-medium text-[var(--primary-300)]">Email Address</span>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white/90 focus:outline-0 focus:ring-2 focus:ring-[var(--primary-600)] border border-[var(--primary-800)] bg-[#1a1122] h-10 placeholder:text-[var(--primary-300)]/60 px-3 text-sm font-normal leading-normal" type="email" value="neo.rider@matrix.net"/>
</label>
</div>
<button class="self-start text-sm font-semibold bg-[var(--primary-600)] text-white px-6 py-2 rounded-md neon-glow hover:bg-[var(--primary-500)] transition-all duration-300">Save Changes</button>
</section>
<section class="flex flex-col gap-6 p-6 bg-[#11091a] border border-[var(--primary-900)] rounded-lg shadow-lg shadow-black/30" id="privacy">
<h2 class="text-2xl font-bold text-[var(--primary-300)] neon-text border-b border-[var(--primary-900)] pb-4">Privacy</h2>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div>
<h3 class="font-medium text-white">Make Profile Private</h3>
<p class="text-sm text-white/60">Only users you approve can see your profile and projects.</p>
</div>
<label class="switch"><input type="checkbox"/><span class="slider round"></span></label>
</div>
<div class="flex items-center justify-between">
<div>
<h3 class="font-medium text-white">Allow Direct Messages</h3>
<p class="text-sm text-white/60">Control who can send you direct messages.</p>
</div>
<select class="form-select w-48 text-sm bg-[#1a1122] text-white/90 border border-[var(--primary-800)] rounded-md focus:ring-2 focus:ring-[var(--primary-600)] focus:border-[var(--primary-600)] transition-all duration-300">
<option>Everyone</option>
<option>Users I Follow</option>
<option>Nobody</option>
</select>
</div>
</div>
</section>
<section class="flex flex-col gap-6 p-6 bg-[#11091a] border border-[var(--primary-900)] rounded-lg shadow-lg shadow-black/30" id="notifications">
<h2 class="text-2xl font-bold text-[var(--primary-300)] neon-text border-b border-[var(--primary-900)] pb-4">Notifications</h2>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div><h3 class="font-medium text-white">New Comments</h3><p class="text-sm text-white/60">Notify me when someone comments on my projects or posts.</p></div>
<label class="switch"><input checked="" type="checkbox"/><span class="slider round"></span></label>
</div>
<div class="flex items-center justify-between">
<div><h3 class="font-medium text-white">Project Mentions</h3><p class="text-sm text-white/60">Notify me when someone mentions my project.</p></div>
<label class="switch"><input checked="" type="checkbox"/><span class="slider round"></span></label>
</div>
<div class="flex items-center justify-between">
<div><h3 class="font-medium text-white">New Followers</h3><p class="text-sm text-white/60">Notify me when a new user follows me.</p></div>
<label class="switch"><input type="checkbox"/><span class="slider round"></span></label>
</div>
<div class="flex items-center justify-between">
<div><h3 class="font-medium text-white">Vibe Code Updates</h3><p class="text-sm text-white/60">Receive newsletters and feature updates via email.</p></div>
<label class="switch"><input checked="" type="checkbox"/><span class="slider round"></span></label>
</div>
</div>
</section>
<section class="flex flex-col gap-6 p-6 bg-[#11091a] border border-[var(--primary-900)] rounded-lg shadow-lg shadow-black/30" id="theme">
<h2 class="text-2xl font-bold text-[var(--primary-300)] neon-text border-b border-[var(--primary-900)] pb-4">Theme</h2>
<div class="flex flex-col gap-4">
<h3 class="font-medium text-white">Select a Vibe</h3>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
<div class="cursor-pointer border-2 border-[var(--primary-500)] rounded-lg p-2 neon-glow">
<div class="w-full h-16 rounded bg-[#0d0714] border border-[var(--primary-900)] flex items-center justify-center">
<span class="text-white neon-text" style="--primary-500: #8c3fff;">Cyber-Purple</span>
</div>
</div>
<div class="cursor-pointer border-2 border-transparent hover:border-[#00ffff] rounded-lg p-2 transition-all duration-300">
<div class="w-full h-16 rounded bg-[#0A192F] border border-[#172A45] flex items-center justify-center">
<span class="text-white" style="text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff;">Neon-Cyan</span>
</div>
</div>
<div class="cursor-pointer border-2 border-transparent hover:border-[#ff00ff] rounded-lg p-2 transition-all duration-300">
<div class="w-full h-16 rounded bg-[#1A001A] border border-[#330033] flex items-center justify-center">
<span class="text-white" style="text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;">Synthwave-Magenta</span>
</div>
</div>
</div>
</div>
</section>
<section class="flex flex-col gap-6 p-6 bg-[#1a0f0f] border border-[#a83232] rounded-lg shadow-lg shadow-black/30" id="danger">
<h2 class="text-2xl font-bold text-[#ff5555] neon-text" style="text-shadow: 0 0 2px #ff5555, 0 0 5px #ff5555, 0 0 10px #d43737;">Danger Zone</h2>
<div class="flex flex-col gap-4">
<div class="flex items-center justify-between">
<div><h3 class="font-medium text-white">Linked Accounts</h3><p class="text-sm text-white/60">Manage your connected social accounts.</p></div>
<div class="flex gap-2">
<button class="text-sm font-semibold bg-[#2c213a] text-white px-4 py-2 rounded-md border border-[var(--primary-800)] hover:border-red-500 hover:text-red-400 transition-all duration-300">Unlink Google</button>
<button class="text-sm font-semibold bg-[#2c213a] text-white px-4 py-2 rounded-md border border-[var(--primary-800)] hover:border-red-500 hover:text-red-400 transition-all duration-300">Unlink GitHub</button>
</div>
</div>
<div class="flex items-center justify-between border-t border-red-500/20 pt-4">
<div><h3 class="font-medium text-white">Delete Account</h3><p class="text-sm text-white/60">Permanently delete your account and all of your content.</p></div>
<button class="text-sm font-semibold bg-red-600/80 text-white px-4 py-2 rounded-md shadow-lg shadow-red-900/50 hover:bg-red-500 transition-all duration-300">Delete My Account</button>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
</div>

</body></html>