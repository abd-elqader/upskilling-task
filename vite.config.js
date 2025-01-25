import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        watch: {
            // Customize which files to watch
            include: ["src/**/*.{js,jsx,ts,tsx,vue}", "public/**/*"],
            // Ignore specific files or directories
            exclude: ["node_modules", "**/dist/**"],
            // Use polling instead of native file system events (useful in some environments)
            usePolling: true,
            // Polling interval in milliseconds
            interval: 1000,
        },
    },
});
