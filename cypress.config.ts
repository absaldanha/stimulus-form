import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://vite:3636/',
    supportFile: false
  }
});
