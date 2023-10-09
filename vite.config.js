import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://paaumarketserver.onrender.com/
const baseURL = "http://localhost:5000";

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
