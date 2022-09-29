import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: ["./assets/cv-photo.jpeg"],
	test: {
		globals: true,
		environment: "jsdom",
	},
});
