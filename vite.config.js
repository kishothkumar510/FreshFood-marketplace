import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const projectDirectory = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `http://localhost:${process.env.API_PORT || 3002}`,
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(projectDirectory, 'index.html'),
        cart: resolve(projectDirectory, 'cart.html'),
        product: resolve(projectDirectory, 'product.html'),
        reservation: resolve(projectDirectory, 'reservation.html'),
        loginSuccess: resolve(projectDirectory, 'loginsucess.html'),
        signupSuccess: resolve(projectDirectory, 'signupsucess.html'),
        success: resolve(projectDirectory, 'success.html'),
      },
    },
  },
});