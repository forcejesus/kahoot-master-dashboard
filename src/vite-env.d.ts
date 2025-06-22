
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENV?: 'development' | 'production'
  readonly VITE_DEBUG?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
