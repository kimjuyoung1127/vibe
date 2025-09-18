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
<button class="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 w-10 bg-[#1a1122] border border-[var(--primary-800)] text-[var(--primary-300)] hover:bg-[var(--primary-900)] hover:border-[var(--primary-700)] hover:text-white transition-all duration-300">
<div class="text-current" data-icon="Bell" data-size="20px" data-weight="regular">
<svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
<path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
</svg>
</div>
<span class="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-400)] opacity-75"></span>
<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--primary-500)]"></span>
</span>
</button>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[var(--primary-700)] neon-glow" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvZEfhBYKbFTFicM9GXhGKozsfG59CORp8em29rjEt4bBwnPAEzj6Qko23TmA1KhYsqNZIoLf-Uketgb7nQ6YtyThnarypSVDsQ5FwagF05byAHVeNvetONMF7ISVbVkE7ECLBPuL-Ed4Z-UFltl1VE0ypmFlA1PNn9YmmG5U5qgtMJYrBYE6d7bnLj9dD0W18y6EYMfV_2w9U466k7dQul31l0VBenZ4Ps3sXfDhr3BZk5DgKeCI3xFm3LZ5r7FVEePQReNgPEdM");'></div>
</div>
</header>
<main class="px-40 flex flex-1 justify-center py-10">
<div class="layout-content-container flex flex-col max-w-[960px] flex-1 gap-8">
<div class="flex p-4 @container bg-[#11091a] rounded-lg border border-[var(--primary-900)] shadow-lg shadow-black/30">
<div class="flex w-full flex-col gap-6 items-center">
<div class="flex gap-6 flex-col items-center">
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-[var(--primary-700)] neon-glow" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL8BPUR0o8U7msmzlxt0WJUDeSoGlswvEjCIovJfuGedi4XGbkVWgSTr4XxGzZoNLKtU2Zkgg02av0cf5Ss4CaxkSAa37HyBbM1GxJpaCuL3zuEpG51PZ3MUKa56w5VjjoLoDNFJZbjzcXKvSlMcNhYCJVnjLuH828ylwXL-ep2WbuiHcEs-KKti4VXDyvljlCuN8lstrCRfp5NDg-DTAuaYffdfsIoIgp6ZJccdpgh2plDEIus7EEuCaQtyA7GZjB0flIdVXhCtI");'></div>
<div class="flex flex-col items-center justify-center gap-1">
<p class="text-white text-3xl font-bold leading-tight tracking-[-0.015em] text-center neon-text">Alex Ryder</p>
<p class="text-[var(--primary-300)] text-base font-normal leading-normal text-center">Software Engineer</p>
<p class="text-[var(--primary-300)]/70 text-sm font-normal leading-normal text-center">Joined 2021</p>
</div>
</div>
<button class="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-[var(--primary-600)] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-48 @[480px]:w-auto hover:bg-[var(--primary-500)] transition-all duration-300 neon-glow">
<span class="truncate">Edit Profile</span>
</button>
</div>
</div>
<div class="flex flex-col gap-6">
<div class="pb-0">
<div class="flex border-b border-[var(--primary-900)] px-4 gap-8">
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-[var(--primary-500)] pb-[13px] pt-4" href="#">
<p class="text-white text-sm font-bold leading-normal tracking-[0.015em] neon-text">Projects</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[var(--primary-300)]/70 pb-[13px] pt-4 hover:text-white hover:border-b-[var(--primary-500)]/50 transition-all duration-300" href="#">
<p class="text-sm font-bold leading-normal tracking-[0.015em]">Reviews</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[var(--primary-300)]/70 pb-[13px] pt-4 hover:text-white hover:border-b-[var(--primary-500)]/50 transition-all duration-300" href="#">
<p class="text-sm font-bold leading-normal tracking-[0.015em]">Lounge Posts</p>
</a>
</div>
</div>
<div class="flex flex-col gap-4">
<h3 class="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4">Featured Projects</h3>
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-4">
<div class="flex flex-col gap-3 group">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeBc6BnJvWP3ldGTlctZR7nC7sHZAKacw3Zl74yoVkCTSduzaE9mvKEmyDTN1yd-Qje5ooZeKYOgU5rN6EBKWbjUlOxvD0RhQ6lIwNzh4Ta55S9NA5WSWOLS0Z8qhIOsWjuraZg2NgCHxILDiqX1EJs6WwoCGpNB2W3LGRsjB-qcm7c8NFABnO8ExRbEzyC7Snh9X12fPTRkABBlYvtyPxA_P7x52I9HQFZVQPbecb0qvOPALZ5qwOHNPPR9lGP5M6S4NrcA4SJcs");'></div>
<div>
<p class="text-white text-base font-medium leading-normal">Project Neon City</p>
<p class="text-[var(--primary-300)]/80 text-sm font-normal leading-normal">A neon-lit city simulation</p>
</div>
</div>
<div class="flex flex-col gap-3 group">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAllafG2JMnArSR2XOLYkXuXOePzl5zXpQy21vC53eOhH6RhudNdSwD9HipO3bzANPthPl8ZjkbWa6K-3oTy3-DviJsv3vTnXe9JTsjaEiyhu84ep3r4Nw5Bp8-Jzfgl6fkuvp10AmkazJkMuK_lsWckeU1NQcUfN7qE0bI8XM7Gmb556ysjMwlkcg4dmzFzxMEB02uUe_ab6IYp5qliMK7Z3-_sJfJ_vV0SIAbgDt2wLa2OgULQVyI3PkNqQ3wKeZmSTTF-nz_rWM");'></div>
<div>
<p class="text-white text-base font-medium leading-normal">Cyberpunk UI Kit</p>
<p class="text-[var(--primary-300)]/80 text-sm font-normal leading-normal">UI components with cyberpunk style</p>
</div>
</div>
<div class="flex flex-col gap-3 group">
<div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuLzUwH9DrP4zn0QrR3JCmHLrpR3TQMGDOCy64WOOMhbPk5oCd2-uGZckwlTclRD_P8mEpYhOzUjO6L5FKWPVaEq-zhsn0OGEkTKXjsDHvIFyg-KQuDsGokWKmxSjEO6r46Xq5PY5i_fA0tGoXeAkWn99itrgX6BoVipPxWgkgYKw8P_9KiRGMyDZ1zX0hJ0H0AWPojZkk0EdZmAT_fvUVGMUIBMwAkrZiyjZWnNmSLca4d8XB_k4VApc-agvjTorRXGfOjYidgk");'></div>
<div>
<p class="text-white text-base font-medium leading-normal">Retro Wave Game</p>
<p class="text-[var(--primary-300)]/80 text-sm font-normal leading-normal">A game with retro wave aesthetics</p>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-4">
<h3 class="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4">All Projects</h3>
<div class="px-4 py-3 @container">
<div class="flex overflow-hidden rounded-lg border border-[var(--primary-900)] bg-[#11091a]">
<table class="flex-1 w-full">
<thead class="bg-[#1a1122]">
<tr>
<th class="px-4 py-3 text-left text-white w-[40%] text-sm font-medium leading-normal">Project</th>
<th class="px-4 py-3 text-left text-white w-[40%] text-sm font-medium leading-normal">Description</th>
<th class="px-4 py-3 text-left text-white w-[10%] text-sm font-medium leading-normal">Status</th>
<th class="px-4 py-3 text-left text-white w-[10%] text-sm font-medium leading-normal">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-[var(--primary-900)]">
<tr class="hover:bg-[#1a1122]/50 transition-colors duration-200">
<td class="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Project Neon City</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)]/80 text-sm font-normal leading-normal">A neon-lit city simulation</td>
<td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
                            Completed
                          </span>
</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)] text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                          View
                        </td>
</tr>
<tr class="hover:bg-[#1a1122]/50 transition-colors duration-200">
<td class="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Cyberpunk UI Kit</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)]/80 text-sm font-normal leading-normal">UI components with cyberpunk style</td>
<td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">
                            In Progress
                          </span>
</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)] text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                          Edit
                        </td>
</tr>
<tr class="hover:bg-[#1a1122]/50 transition-colors duration-200">
<td class="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Retro Wave Game</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)]/80 text-sm font-normal leading-normal">A game with retro wave aesthetics</td>
<td class="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
                            Completed
                          </span>
</td>
<td class="h-[72px] px-4 py-2 text-[var(--primary-300)] text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                          View
                        </td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

</body></html>