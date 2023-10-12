import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const baseURL =
  "https://paaumarketserver.onrender.com/" || "http://localhost:5000";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^/(api|storage)/.*": {
        target: baseURL,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
