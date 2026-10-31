import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A URL da API não é configurada aqui: o build e o dev server leem
// VITE_API_URL do ambiente (.env local ou variável no deploy).
export default defineConfig({
  plugins: [react()],
});
