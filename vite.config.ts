import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'docs',
    sourcemap: true
  },
  base: process.env.NODE_ENV === 'production' ? '/calculationparm/' : '/'
})

