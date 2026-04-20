import { defineConfig } from 'vite';

const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  build: {
    outDir: isVercel ? 'dist' : '../../dist/apps/landing',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
