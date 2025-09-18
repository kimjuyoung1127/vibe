<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Space+Grotesk:wght@400;500;700" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<title>Vibe Code - Project Details</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
      :root {
        --primary-color: #8013ec;
        --secondary-color: #ad92c9;
        --background-color: #1a1122;
        --surface-color: #2c1a3b;
        --border-color: #362348;
      }
      .vibe-check-button {
        box-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 15px var(--primary-color), 0 0 20px var(--primary-color);
        transition: box-shadow 0.3s ease-in-out, color 0.3s ease-in-out;
      }
      .vibe-check-button:hover {
        box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 30px var(--primary-color), 0 0 40px var(--primary-color);
      }
      .markdown-content h1,
      .markdown-content h2,
      .markdown-content h3 {
        color: white;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 700;
      }
      .markdown-content h1 {
        font-size: 2rem;
      }
      .markdown-content h2 {
        font-size: 1.75rem;
      }
      .markdown-content h3 {
        font-size: 1.5rem;
      }
      .markdown-content p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }
      .markdown-content a {
        color: var(--primary-color);
        text-decoration: underline;
      }
      .markdown-content ul {
        list-style: disc;
        padding-left: 1.5rem;
        margin-bottom: 1rem;
      }
      .markdown-content ol {
        list-style: decimal;
        padding-left: 1.5rem;
        margin-bottom: 1rem;
      }
      .markdown-content blockquote {
        border-left: 4px solid var(--primary-color);
        padding-left: 1rem;
        margin-left: 0;
        margin-bottom: 1rem;
        color: var(--secondary-color);
        font-style: italic;
      }
      .markdown-content code {
        background-color: var(--surface-color);
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: 'Space Grotesk', monospace;
      }
      .markdown-content pre {
        background-color: var(--surface-color);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin-bottom: 1rem;
      }
      .markdown-content pre code {
        padding: 0;
        background-color: transparent;
      }
    </style>
</head>
<body class="bg-[var(--background-color)] text-white" style='font-family: "Space Grotesk", sans-serif;'>
<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
<header class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] bg-[var(--background-color)]/80 px-10 py-3 backdrop-blur-sm">
<div class="flex items-center gap-4">
<svg class="text-[var(--primary-color)] size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
<path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor"></path>
</svg>
<h1 class="text-xl font-bold tracking-tighter">Vibe Code</h1>
</div>
<nav class="hidden md:flex items-center gap-8 text-sm font-medium">
<a class="text-white hover:text-[var(--primary-color)] transition-colors" href="#">Showcase</a>
<a class="text-white hover:text-[var(--primary-color)] transition-colors" href="#">Community</a>
<a class="text-white hover:text-[var(--primary-color)] transition-colors" href="#">Technologies</a>
</nav>
<div class="flex items-center gap-4">
<button class="hidden sm:flex min-w-[90px] items-center justify-center rounded-md h-10 px-4 bg-[var(--surface-color)] hover:bg-[var(--border-color)] text-sm font-bold transition-colors">
<span class="truncate">New Post</span>
</button>
<div class="size-10 rounded-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_F5lrGZutv8OOsJyhMP89e7NGifO8rogMhJWV0I5VEq19ufFPXH0h_VZfu3HteyIGjUnCgkIFdfRrDKLOzRUGMlKuxEBOWkRdpw3IfpHcfOg3XU1eUdNBbrcUQv50vfQ-ysm5hWmEuA0nEfmojEuFUpF843G3Sud39emP_5TfT7xUNIWeG7I0Pa3WiCR4LekWzfRDa_v_f9l6Gp3TwpO9p74hTOC_GIEnlLvhQHRIYJ8CANzSOuealvpD4xudlG3jmMUAmJPeWTg");'></div>
</div>
</header>
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="max-w-4xl mx-auto">
<div class="mb-8">
<span class="text-sm text-[var(--secondary-color)]">
<a class="hover:text-[var(--primary-color)]" href="#">Showcase</a>
<span class="mx-2">/</span>
<span>Project Title: Neon Dreams</span>
</span>
</div>
<article class="bg-[var(--surface-color)] rounded-lg shadow-lg shadow-[var(--primary-color)]/10">
<div class="p-6 md:p-8">
<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Project Title: Neon Dreams</h2>
<p class="text-[var(--secondary-color)] text-sm mb-6">Posted by <a class="font-medium text-white hover:text-[var(--primary-color)]" href="#">Alex Ryder</a> · 2 days ago</p>
<div class="markdown-content text-gray-300">
<p>Neon Dreams is a project that explores the fusion of retro aesthetics with modern web development techniques. It's a showcase of vibrant colors, dynamic animations, and interactive elements, all wrapped up in a cyberpunk theme. The project utilizes React for the frontend, Node.js for the backend, and MongoDB for data storage. Key features include a user authentication system, a project gallery, and a community forum where users can share their own creations and feedback.</p>
<blockquote>"The future is already here – it's just not evenly distributed." - William Gibson</blockquote>
<p>We drew a lot of inspiration from cyberpunk classics to create an immersive experience.</p>
<h3>Tech Stack</h3>
<ul>
<li>React</li>
<li>Node.js</li>
<li>MongoDB</li>
<li>Tailwind CSS</li>
</ul>
<pre><code class="language-javascript">
function VibeCheck() {
  const [likes, setLikes] = useState(123);
  return (
    &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;
      Vibe Check: {likes}
    &lt;/button&gt;
  );
}
                </code></pre>
</div>
<div class="mt-8 flex items-center justify-start">
<button class="vibe-check-button flex items-center gap-2 rounded-full bg-[var(--primary-color)] px-4 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105">
<span class="material-symbols-outlined">favorite</span>
<span>Vibe Check</span>
<span class="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">123</span>
</button>
</div>
</div>
</article>
<section class="mt-12" id="comments">
<h3 class="text-2xl font-bold mb-6">Comments</h3>
<div class="space-y-6">
<div class="flex gap-4">
<div class="size-10 rounded-full bg-cover bg-center flex-shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBriRgbcmjHlFctAk61O-bSeMm1EnbfWjs81fyjInRuKBpkdk_VixHeY24TBWLttq_a6sDSR_etLTeW1De_UAKvzTzeXWLV6LyR4I6e_INUVq44hRapWtrHjMj_TwCdyAdMlGmzu5txh2GKVv59Xb-ckytMRbrdxuk3x5vqT8Dz4MuAJ83l7Livq4HmyEzcWrfBjo_-hh0xaIgMAGdNnHyamtxvCZ0OrP_2V1klo6MvxjUZfMhalTw8slBg5DQ6Q3QcLoIfy4Gunh4");'></div>
<div class="flex-1 bg-[var(--surface-color)] rounded-lg p-4 border border-[var(--border-color)]">
<div class="flex items-baseline justify-between mb-2">
<p class="font-bold text-white">Sarah Walker</p>
<p class="text-xs text-[var(--secondary-color)]">1 day ago</p>
</div>
<p class="text-sm text-gray-300">This project is absolutely stunning! The neon effects are mesmerizing, and the overall design is incredibly polished. I'm particularly impressed with the user authentication system. Great work!</p>
</div>
</div>
<div class="flex gap-4">
<div class="size-10 rounded-full bg-cover bg-center flex-shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXR9Y-M-2D87aGIZcAu9YJBN3VRCZraYcwWAEh8to1xR_TmW2X3RfZlqJuah2ao-C1drzjxRsG49j2zV_GzfwaJYCMUSVgDVGAKtBjhwfUkVcuB4ATa_qW3LjWsfMmHh6DHKy8aKiAA23iW0vJOGLx5KTLYyH6PVBM5NH6n9v9QRs77y1Gw-mVp3kWRh4ypLcq9OdotzaG70XPw_h1v_tGBwELBVbtyD6VaIVa6kKvHauKblOwbMNITCcOYPH0q--62MikjMQZamU");'></div>
<div class="flex-1 bg-[var(--surface-color)] rounded-lg p-4 border border-[var(--border-color)]">
<div class="flex items-baseline justify-between mb-2">
<p class="font-bold text-white">Mark Johnson</p>
<p class="text-xs text-[var(--secondary-color)]">2 days ago</p>
</div>
<p class="text-sm text-gray-300">I love the cyberpunk theme! It's so well executed. The project gallery is a fantastic feature, and I can't wait to see more projects from the community. Keep up the excellent work!</p>
</div>
</div>
</div>
</section>
<div class="mt-12 flex items-start gap-4">
<div class="size-10 rounded-full bg-cover bg-center flex-shrink-0" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYM88q9iAc_iyKD_S0kYi-dm0KQoo_efkCN_cM2tkgjUHuhmPqx5zUR-HpGFAIOCpzzWP9N253DN_R-2HBAuB92lNQpRDceC5KxIF2Qvl1qji3J0fozi6j_WnrAzxmRzArEG-L9XzJPJZtFOEpiDX7IYuvssDXkQwa012S3YyH9I6MF4T1mvIMCTKwZF9rF8Gyrq_XDMw3JbFb-DdwadaHNxbPNVstGAOhgV_4KdlYW0TJubsak-5aF9bVKd4bHu692np-RpaoHP4");'></div>
<div class="flex-1">
<form class="relative">
<textarea class="form-textarea w-full resize-y rounded-md bg-[var(--surface-color)] border border-[var(--border-color)] text-white placeholder-[var(--secondary-color)] focus:border-[var(--primary-color)] focus:ring focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition" placeholder="Add a comment..." rows="3"></textarea>
<button class="absolute bottom-3 right-3 min-w-[84px] cursor-pointer rounded-md h-8 px-4 bg-[var(--primary-color)] hover:bg-fuchsia-600 text-white text-sm font-medium leading-normal transition-colors" type="submit">Post</button>
</form>
</div>
</div>
</div>
</main>
</div>

</body></html>