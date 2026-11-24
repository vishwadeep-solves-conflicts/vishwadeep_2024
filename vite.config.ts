import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // three pages: the home page, the work log at /work/ and the apps hub at /apps/
      input: {
        main: 'index.html',
        work: 'work/index.html',
        apps: 'apps/index.html',
      },
    },
  },
})
