import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias 로 절대 경로 별칭 설정
    alias: [
      // @src를 src 디렉토리로 대체. tsconfig.json의 설정과 동일
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "@app",
        replacement: resolve(__dirname, "src/app"),
      },
      {
        find: "@features",
        replacement: resolve(__dirname, "src/features"),
      },
    ],
  },
  plugins: [react(), tsconfigPaths()],
})
