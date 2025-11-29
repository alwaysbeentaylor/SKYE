import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // API routes are handled by Vercel serverless functions in production
        // In development, the app uses local storage fallbacks (see utils/adminApi.ts, utils/visitorTracking.ts)
        // No proxy needed for development
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_TELEGRAM_BOT_TOKEN': JSON.stringify(env.VITE_TELEGRAM_BOT_TOKEN),
        'import.meta.env.VITE_TELEGRAM_USER_ID': JSON.stringify(env.VITE_TELEGRAM_USER_ID)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
