// vite.config.js
import { defineConfig } from "file:///D:/Coding/Image%20Gallery/image-gallery_client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Coding/Image%20Gallery/image-gallery_client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api/v1/photo-gallery": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/api/v1/photo-home": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/api/v1/photo-user-collection": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/api/v1/photo-user-like": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/api/v1/password-forgot": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
      "/api/v1/password-reset": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2RpbmdcXFxcSW1hZ2UgR2FsbGVyeVxcXFxpbWFnZS1nYWxsZXJ5X2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kaW5nXFxcXEltYWdlIEdhbGxlcnlcXFxcaW1hZ2UtZ2FsbGVyeV9jbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGluZy9JbWFnZSUyMEdhbGxlcnkvaW1hZ2UtZ2FsbGVyeV9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICBcIi9hcGkvdjEvcGhvdG8tZ2FsbGVyeVwiOiB7XG4gICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgc2VjdXJlOiBmYWxzZSxcbiAgICB3czogdHJ1ZVxuICB9LFxuICAgIFwiL2FwaS92MS9waG90by1ob21lXCI6IHtcbiAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICBzZWN1cmU6IGZhbHNlLFxuICAgIHdzOiB0cnVlXG4gIH0sXG4gICAgXCIvYXBpL3YxL3Bob3RvLXVzZXItY29sbGVjdGlvblwiOiB7XG4gICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgc2VjdXJlOiBmYWxzZSxcbiAgICB3czogdHJ1ZVxuICB9LFxuICAgIFwiL2FwaS92MS9waG90by11c2VyLWxpa2VcIjoge1xuICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgIHNlY3VyZTogZmFsc2UsXG4gICAgd3M6IHRydWVcbiAgfSxcbiAgICBcIi9hcGkvdjEvcGFzc3dvcmQtZm9yZ290XCI6IHtcbiAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICBzZWN1cmU6IGZhbHNlLFxuICAgIHdzOiB0cnVlXG4gIH0sXG4gICAgXCIvYXBpL3YxL3Bhc3N3b3JkLXJlc2V0XCI6IHtcbiAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICBzZWN1cmU6IGZhbHNlLFxuICAgIHdzOiB0cnVlXG4gIH1cbn19LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1UsU0FBUyxvQkFBb0I7QUFDN1YsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNQLHlCQUF5QjtBQUFBLFFBQ3pCLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDRSxzQkFBc0I7QUFBQSxRQUN0QixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0UsaUNBQWlDO0FBQUEsUUFDakMsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNFLDJCQUEyQjtBQUFBLFFBQzNCLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDRSwyQkFBMkI7QUFBQSxRQUMzQixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0UsMEJBQTBCO0FBQUEsUUFDMUIsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFBQztBQUFBLEVBQ0MsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNuQixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
