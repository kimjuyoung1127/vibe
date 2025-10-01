   ▲ Next.js 14.0.0
   - Environments: .env.local
   Creating an optimized production build ...
 ⚠ Custom webpack configuration is detected. When using a custom webpack configuration, the Webpack build worker is disabled by default. To force enable it, set the "experimental.webpackBuildWorker" option to "true". Read more: https://nextjs.org/docs/messages/webpack-build-worker-opt-out
<w> [webpack.cache.PackFileCacheStrategy] Restoring pack failed from /vercel/path0/vibe-code/.next/cache/webpack/edge-server-production.pack: Error: Invalid file version
 ✓ Compiled successfully
   Linting and checking validity of types ...
Failed to compile.
./app/components/VibeTipTapEditor.tsx:29:15
Type error: Property 'parent' does not exist on type '{ name: string; options: ParagraphOptions; storage: any; editor: Editor; type: NodeType; }'.
  27 |   addAttributes() {
  28 |     return {
> 29 |       ...this.parent?.(),
     |               ^
  30 |       marginBottom: {
  31 |         default: '1rem',
  32 |         parseHTML: el => el.getAttribute('data-margin-bottom') || '1rem',
Error: Command "npm run build" exited with 1