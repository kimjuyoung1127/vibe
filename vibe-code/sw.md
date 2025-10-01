   ▲ Next.js 14.0.0
   - Environments: .env.local
   Creating an optimized production build ...
 ⚠ Custom webpack configuration is detected. When using a custom webpack configuration, the Webpack build worker is disabled by default. To force enable it, set the "experimental.webpackBuildWorker" option to "true". Read more: https://nextjs.org/docs/messages/webpack-build-worker-opt-out
<w> [webpack.cache.PackFileCacheStrategy] Restoring pack failed from /vercel/path0/vibe-code/.next/cache/webpack/edge-server-production.pack: Error: Invalid file version
 ✓ Compiled successfully
   Linting and checking validity of types ...
Failed to compile.
./app/components/VibeTipTapEditor.tsx:29:10
Type error: The 'this' context of type 'NodeConfig<ParagraphOptions, any>' is not assignable to method's 'this' of type '{ name: string; options: ParagraphOptions; storage: any; parent: (() => {} | Attributes$1) | undefined; editor?: Editor | undefined; }'.
  Type 'NodeConfig<ParagraphOptions, any>' is missing the following properties from type '{ name: string; options: ParagraphOptions; storage: any; parent: (() => {} | Attributes$1) | undefined; editor?: Editor | undefined; }': options, storage, parent
  27 |   addAttributes() {
  28 |     return {
> 29 |       ...Paragraph.config.addAttributes?.(),
     |          ^
  30 |       marginBottom: {
  31 |         default: '1rem',
  32 |         parseHTML: el => el.getAttribute('data-margin-bottom') || '1rem',
Error: Command "npm run build" exited with 1