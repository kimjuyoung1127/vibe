<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta charset="utf-8"/>
<link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect"/>
<link as="style" href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Space+Grotesk%3Awght%40400%3B500%3B700" onload="this.rel='stylesheet'" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<title>Stitch Design</title>
<link href="data:image/x-icon;base64," rel="icon" type="image/x-icon"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style type="text/tailwindcss">
      :root {
        --primary-color: #8013ec;
      }
      .neon-glow {
        box-shadow: 0 0 5px var(--primary-color), 0 0 10px var(--primary-color), 0 0 20px var(--primary-color), 0 0 40px var(--primary-color);
      }
      .neon-glow-subtle {
        box-shadow: 0 0 2px var(--primary-color), 0 0 5px var(--primary-color), 0 0 10px var(--primary-color);
      }
    </style>
</head>
<body class="bg-gray-900 bg-opacity-50">
<div class="relative flex h-auto min-h-screen w-full flex-col bg-transparent dark group/design-root overflow-x-hidden" style='font-family: "Space Grotesk", "Noto Sans", sans-serif;'>
<div class="fixed inset-0 bg-[#110c18] bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
<div class="relative bg-[#1a1122] border border-[#4d3267] rounded-xl shadow-lg w-full max-w-md p-8 neon-glow-subtle">
<button class="absolute top-4 right-4 text-[#ad92c9] hover:text-white transition-colors">
<span class="material-symbols-outlined">
                    close
                </span>
</button>
<div class="text-center mb-6">
<h2 class="text-3xl font-bold text-white mb-2 tracking-wider">Share Project</h2>
<p class="text-[#ad92c9]">Broadcast your creation to the network.</p>
</div>
<div class="space-y-6">
<div>
<label class="text-sm font-bold text-[#ad92c9] uppercase tracking-wider" for="project-link">Project Link</label>
<div class="flex items-center gap-2 mt-2">
<input class="form-input w-full rounded-lg text-white bg-[#261933] border-2 border-[#4d3267] focus:border-[var(--primary-color)] focus:ring-0 h-12 placeholder:text-[#6c5880] px-4 text-base transition-all duration-300 neon-glow-subtle focus:neon-glow" id="project-link" readonly="" type="text" value="https://vibecode.io/project/neuromancer-v2"/>
<button class="flex items-center justify-center rounded-lg h-12 w-12 bg-[var(--primary-color)] text-white hover:bg-opacity-90 transition-all duration-300 neon-glow">
<span class="material-symbols-outlined">content_copy</span>
</button>
</div>
</div>
<div>
<p class="text-sm font-bold text-[#ad92c9] uppercase tracking-wider mb-2">Share on Social</p>
<div class="flex justify-center gap-4">
<button class="flex items-center justify-center h-14 w-14 rounded-full bg-[#261933] border-2 border-[#4d3267] hover:border-[var(--primary-color)] text-[#ad92c9] hover:text-white transition-all duration-300 neon-glow-subtle hover:neon-glow">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.27 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.48.75 2.79 1.9 3.55-.7-.02-1.37-.22-1.95-.5v.03c0 2.07 1.48 3.8 3.43 4.2-.36.1-.74.15-1.12.15-.28 0-.55-.03-.81-.08.55 1.7 2.13 2.93 4.02 2.96-1.47 1.15-3.32 1.83-5.33 1.83-.35 0-.69-.02-1.03-.06 1.9 1.23 4.15 1.95 6.56 1.95 7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path></svg>
</button>
<button class="flex items-center justify-center h-14 w-14 rounded-full bg-[#261933] border-2 border-[#4d3267] hover:border-[var(--primary-color)] text-[#ad92c9] hover:text-white transition-all duration-300 neon-glow-subtle hover:neon-glow">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm3.19 5.04c.03.1.06.2.09.3l.06.18c.02.05.04.1.06.15l.02.06c.03.09.06.18.08.27l.01.03c.02.06.03.12.04.18c.01.06.02.12.03.18c0 .05.01.09.01.14v.04c0 .06.01.11.01.17v.14c0 .06,0 .12.01.18v.22c0 .05.01.1.01.16c0 .07,0 .14,0 .21c0 .07,0 .14.01.21c0 .07,0 .13,0 .2c-.01.07-.01.14-.01.21c-.01.07-.01.14-.02.21c0 .07-.01.13-.02.2c-.01.06-.02.12-.03.18c-.01.06-.02.12-.04.18c-.01.04-.02.08-.03.12c-.02.08-.05.17-.08.25c-.01.03-.02.06-.04.08l-.06.15c-.03.07-.06.14-.09.2c-.03.06-.06.12-.1.18c-.01.03-.03.05-.04.08l-1.3 2.13v-2.14c0-.23-.05-.45-.14-.66c-.09-.2-.22-.38-.38-.53l-.01-.01c-.16-.16-.36-.28-.58-.36c-.22-.08-.45-.12-.69-.12H9.5c-.55 0-1-.45-1-1s.45-1 1-1h2.19c.55 0 1 .45 1 1v.01zM11.5 16c-.28 0-.5.22-.5.5s.22.5.5.5h.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-.5z" fill-rule="evenodd"></path></svg>
</button>
<button class="flex items-center justify-center h-14 w-14 rounded-full bg-[#261933] border-2 border-[#4d3267] hover:border-[var(--primary-color)] text-[#ad92c9] hover:text-white transition-all duration-300 neon-glow-subtle hover:neon-glow">
<span class="material-symbols-outlined text-3xl">link</span>
</button>
</div>
</div>
<div>
<label class="text-sm font-bold text-[#ad92c9] uppercase tracking-wider" for="embed-code">Embed</label>
<div class="flex items-center gap-2 mt-2">
<input class="form-input w-full rounded-lg text-white bg-[#261933] border-2 border-[#4d3267] focus:border-[var(--primary-color)] focus:ring-0 h-12 placeholder:text-[#6c5880] px-4 text-sm transition-all duration-300 neon-glow-subtle focus:neon-glow" id="embed-code" readonly="" type="text" value='&lt;iframe src="https://vibecode.io/embed/..."&gt;&lt;/iframe&gt;'/>
<button class="flex items-center justify-center rounded-lg h-12 w-12 bg-[#261933] border-2 border-[#4d3267] hover:border-[var(--primary-color)] text-[#ad92c9] hover:text-white transition-all duration-300 neon-glow-subtle hover:neon-glow">
<span class="material-symbols-outlined">code</span>
</button>
</div>
</div>
</div>
</div>
</div>
</div>

</body></html>