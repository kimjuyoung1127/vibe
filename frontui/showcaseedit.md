<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Space+Grotesk:wght@400;500;700&amp;family=VT323" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<title>Vibe Code - New Post</title>
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
      .font-retro {
        font-family: 'VT323', monospace;
      }
      .font-modern {
        font-family: 'Space Grotesk', sans-serif;
      }
      .vibe-tool-button {
        box-shadow: 0 0 3px var(--primary-color), 0 0 6px var(--primary-color);
        transition: box-shadow 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out;
      }
      .vibe-tool-button:hover, .vibe-tool-button.active {
        box-shadow: 0 0 6px var(--primary-color), 0 0 12px var(--primary-color), 0 0 18px var(--primary-color);
        background-color: var(--primary-color);
        color: white;
      }
      .editor-textarea::selection {
        background-color: var(--primary-color);
        color: white;
      }
      .terminal-block {
          background-color: #0D0208;
          border: 1px solid #362348;
          border-radius: 4px;
          padding: 1rem;
          font-family: 'VT323', monospace;
          color: #00FF41;
      }
      .terminal-header {
        display: flex;
        align-items: center;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid #362348;
        margin-bottom: 0.75rem;
      }
      .terminal-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 6px;
      }
      .neon-highlight {
        text-shadow: 0 0 5px #f0f, 0 0 10px #f0f;
        color: #ffc8ff;
      }
      .info-box {
        background-color: rgba(63, 133, 244, 0.1);
        border-left: 4px solid #3F85F4;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .warning-box {
        background-color: rgba(251, 188, 5, 0.1);
        border-left: 4px solid #FBBC05;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .banner-8bit {
        background-image: repeating-linear-gradient(45deg, #1a1122, #1a1122 10px, #2c1a3b 10px, #2c1a3b 20px);
        padding: 1rem;
        border: 2px solid var(--primary-color);
        text-align: center;
        font-family: 'VT323', monospace;
        font-size: 1.5rem;
        color: white;
        text-shadow: 3px 3px 0px #000;
      }
    </style>
</head>
<body class="bg-[var(--background-color)] text-white font-modern">
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
<button class="hidden sm:flex min-w-[90px] items-center justify-center rounded-md h-10 px-4 bg-[var(--primary-color)] text-white text-sm font-bold transition-colors">
<span class="truncate">New Post</span>
</button>
<div class="size-10 rounded-full bg-cover bg-center" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_F5lrGZutv8OOsJyhMP89e7NGifO8rogMhJWV0I5VEq19ufFPXH0h_VZfu3HteyIGjUnCgkIFdfRrDKLOzRUGMlKuxEBOWkRdpw3IfpHcfOg3XU1eUdNBbrcUQv50vfQ-ysm5hWmEuA0nEfmojEuFUpF843G3Sud39emP_5TfT7xUNIWeG7I0Pa3WiCR4LekWzfRDa_v_f9l6Gp3TwpO9p74hTOC_GIEnlLvhQHRIYJ8CANzSOuealvpD4xudlG3jmMUAmJPeWTg");'></div>
</div>
</header>
<main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="max-w-5xl mx-auto">
<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Create New Post</h2>
<p class="text-[var(--secondary-color)] text-base mb-8">Share your project experiences, code snippets, and design philosophies with the Vibe Code community.</p>
<div class="bg-[var(--surface-color)] rounded-lg shadow-lg shadow-[var(--primary-color)]/20 border border-[var(--border-color)]">
<div class="p-4 border-b border-[var(--border-color)]">
<input class="w-full bg-transparent text-2xl font-bold text-white placeholder-[var(--secondary-color)]/50 focus:ring-0 border-0 p-0" placeholder="Enter post title here..." type="text"/>
</div>
<div class="p-4 border-b border-[var(--border-color)] flex flex-wrap items-center gap-2">
<div class="flex items-center gap-1">
<button class="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Bold"><span class="material-symbols-outlined text-xl">format_bold</span></button>
<button class="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Italic"><span class="material-symbols-outlined text-xl">format_italic</span></button>
<button class="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="Link"><span class="material-symbols-outlined text-xl">link</span></button>
<button class="p-2 rounded hover:bg-[var(--border-color)] text-[var(--secondary-color)] hover:text-white transition-colors" title="List"><span class="material-symbols-outlined text-xl">format_list_bulleted</span></button>
</div>
<div class="h-6 w-px bg-[var(--border-color)] mx-2"></div>
<div class="flex items-center gap-2">
<span class="text-sm font-semibold text-[var(--secondary-color)] mr-2">Vibe Tools:</span>
<button class="vibe-tool-button p-2 rounded text-[var(--secondary-color)]" title="Neon Highlight"><span class="material-symbols-outlined text-xl">format_paint</span></button>
<button class="vibe-tool-button p-2 rounded text-[var(--secondary-color)]" title="Info Box"><span class="material-symbols-outlined text-xl">info</span></button>
<button class="vibe-tool-button p-2 rounded text-[var(--secondary-color)]" title="Warning Box"><span class="material-symbols-outlined text-xl">warning</span></button>
<button class="vibe-tool-button p-2 rounded text-[var(--secondary-color)]" title="8-Bit Banner"><span class="material-symbols-outlined text-xl">view_carousel</span></button>
<button class="vibe-tool-button active p-2 rounded text-[var(--secondary-color)]" title="Terminal Code Block"><span class="material-symbols-outlined text-xl">terminal</span></button>
</div>
<div class="flex-grow"></div>
<div class="flex items-center gap-2">
<button class="px-3 py-1 rounded text-sm font-semibold bg-[var(--border-color)] hover:bg-[var(--primary-color)] transition-colors">Retro</button>
<button class="px-3 py-1 rounded text-sm font-semibold bg-[var(--primary-color)]">Modern</button>
</div>
</div>
<div class="p-4">
<textarea class="editor-textarea font-modern w-full h-96 resize-none bg-transparent text-white placeholder-[var(--secondary-color)]/50 focus:ring-0 border-0 p-0" placeholder="Start writing your post in Markdown... Add some vibe!"></textarea>
</div>
<div class="p-4 border-t border-[var(--border-color)]">
<h3 class="text-lg font-bold mb-4 text-[var(--secondary-color)]">Live Preview</h3>
<div class="prose prose-invert max-w-none text-gray-300">
<div class="banner-8bit">AWESOME BANNER</div>
<p>This is a preview of your post. Use the <span class="neon-highlight">Neon Highlight</span> tool to make text pop.</p>
<div class="info-box">
<p><strong>Info:</strong> This is an info box. Use it to provide helpful tips or additional context.</p>
</div>
<div class="warning-box">
<p><strong>Warning:</strong> This is a warning box. Use it for alerts or important notices.</p>
</div>
<div class="terminal-block">
<div class="terminal-header">
<div class="terminal-dot bg-red-500"></div>
<div class="terminal-dot bg-yellow-500"></div>
<div class="terminal-dot bg-green-500"></div>
</div>
<pre class="!p-0 !m-0 bg-transparent"><code class="language-javascript text-[#00FF41]">$ npm install vibe-code-cli
...
Vibe check complete. Ready to code.</code></pre>
</div>
</div>
</div>
</div>
<div class="mt-8 flex justify-end gap-4">
<button class="min-w-[120px] rounded-md h-10 px-4 bg-[var(--surface-color)] hover:bg-[var(--border-color)] text-sm font-bold transition-colors">Save Draft</button>
<button class="min-w-[120px] rounded-md h-10 px-4 bg-[var(--primary-color)] vibe-check-button text-white text-sm font-bold">Publish Post</button>
</div>
</div>
</main>
</div>

</body></html>