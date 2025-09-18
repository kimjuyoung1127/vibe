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
<h2 class="text-3xl font-bold text-white mb-2 tracking-wider">Report Content</h2>
<p class="text-[#ad92c9]">Help us keep the network safe.</p>
</div>
<div class="space-y-6">
<div>
<label class="text-sm font-bold text-[#ad92c9] uppercase tracking-wider" for="violation-type">Reason for Reporting</label>
<div class="relative mt-2">
<select class="form-select w-full appearance-none rounded-lg text-white bg-[#261933] border-2 border-[#4d3267] focus:border-[var(--primary-color)] focus:ring-0 h-12 px-4 text-base transition-all duration-300 neon-glow-subtle focus:neon-glow" id="violation-type">
<option class="text-gray-400" disabled="" selected="">Select a reason</option>
<option>Spam</option>
<option>Hate Speech</option>
<option>Misinformation</option>
<option>Harassment</option>
<option>Other</option>
</select>
<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#ad92c9]">
<span class="material-symbols-outlined">
                            keyboard_arrow_down
                        </span>
</div>
</div>
</div>
<div>
<label class="text-sm font-bold text-[#ad92c9] uppercase tracking-wider" for="details">Additional Details</label>
<textarea class="form-textarea w-full rounded-lg text-white bg-[#261933] border-2 border-[#4d3267] focus:border-[var(--primary-color)] focus:ring-0 mt-2 h-32 placeholder:text-[#6c5880] px-4 py-2 text-base transition-all duration-300 neon-glow-subtle focus:neon-glow" id="details" placeholder="Provide more information about the issue..."></textarea>
</div>
<button class="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-[var(--primary-color)] text-white font-bold tracking-wider uppercase hover:bg-opacity-90 transition-all duration-300 neon-glow">
<span class="material-symbols-outlined">
                        send
                    </span>
                    Submit Report
                </button>
</div>
</div>
</div>
</div>

</body></html>