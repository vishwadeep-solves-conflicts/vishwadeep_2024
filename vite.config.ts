import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // two pages: the home page and the work log at /work/
      input: {
        main: 'index.html',
        work: 'work/index.html',
      },
    },
  },
})
