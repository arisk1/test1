import { defineConfig } from 'vite';

const isRepoRootBuild = process.cwd().endsWith('/test1');

export default defineConfig({
  root: isRepoRootBuild ? 'apps/landing' : '.',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  build: {
    outDir: isRepoRootBuild ? '../../dist/apps/landing' : 'dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
