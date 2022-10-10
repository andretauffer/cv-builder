import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: ["./assets/cv-photo.jpeg"],
	base: "https://developer.andregirao.com/",
	test: {
		globals: true,
		environment: "jsdom",
	},
});
