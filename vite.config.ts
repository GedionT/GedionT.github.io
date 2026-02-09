import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import ViteSitemap from 'vite-plugin-sitemap';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      ViteSitemap({
        basePath: 'https://gediont.github.io',
        generateRobotsTxt: true,
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: 'Gedion Teshome Disassa - Systems Architect & Research Software Engineer',
            description: 'Exploring the intersection of High-Performance Systems and Generative AI. Architecting digital universes through code, with a focus on data, ambient intelligence, and design.',
          },
        },
      }),
      tailwindcss(),
    ],
    base: "/",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
  };
});

