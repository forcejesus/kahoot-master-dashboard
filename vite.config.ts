
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
  // Désactiver le cache en développement pour voir les changements immédiatement
  ...(mode === 'development' && {
    optimizeDeps: {
      force: true
    },
    server: {
      host: "::",
      port: 8080,
      force: true,
      // Forcer le rechargement complet de la page pour les changements de configuration
      hmr: {
        overlay: true
      }
    }
  })
}));
