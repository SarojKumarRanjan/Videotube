import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
