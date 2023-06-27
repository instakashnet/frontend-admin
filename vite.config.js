import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import envCompatible from 'vite-plugin-env-compatible'
import dns from 'dns'
import path from 'path'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'REACT_APP_',
  build: {
    outDir: 'build'
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    }),
    envCompatible()
  ],
  server: {
    open: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
