
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Désactiver le cache en développement
  define: {
    __DEV__: mode === 'development',
  },
  optimizeDeps: {
    force: mode === 'development', // Force la re-optimisation des dépendances en dev
  },
  build: {
    rollupOptions: {
      output: {
        // Ajouter un hash pour forcer le rechargement
        assetFileNames: mode === 'development' 
          ? '[name].[hash].[ext]' 
          : 'assets/[name]-[hash].[ext]'
      }
    }
  }
}));
