// vite.config.ts
import { defineConfig } from "file:///Users/gustavo/Desktop/sistemas_varios/INCLUSIA_AI/node_modules/vite/dist/node/index.js";
import react from "file:///Users/gustavo/Desktop/sistemas_varios/INCLUSIA_AI/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import JavaScriptObfuscator from "file:///Users/gustavo/Desktop/sistemas_varios/INCLUSIA_AI/node_modules/javascript-obfuscator/dist/index.js";
function aegisObfuscate() {
  const obfuscatorOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.3,
    debugProtection: true,
    debugProtectionInterval: 1e3,
    disableConsoleOutput: true,
    selfDefending: true,
    ignoreImports: true,
    renameGlobals: true,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  };
  return {
    name: "aegis-obfuscate",
    apply: "build",
    enforce: "post",
    generateBundle(_opts, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== "chunk" || !chunk.code) continue;
        const hasAppCode = Object.keys(chunk.modules).some((id) => !id.includes("node_modules") && !id.startsWith("\0"));
        if (!hasAppCode) continue;
        try {
          chunk.code = JavaScriptObfuscator.obfuscate(chunk.code, obfuscatorOptions).getObfuscatedCode();
        } catch (err) {
          console.warn(`[aegis] obfuscation skipped for ${chunk.name}:`, err.message);
        }
      }
    }
  };
}
function aegisCsp() {
  const csp = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data: https:",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join("; ");
  return {
    name: "aegis-csp",
    apply: "build",
    transformIndexHtml() {
      return [{ tag: "meta", attrs: { "http-equiv": "Content-Security-Policy", content: csp }, injectTo: "head-prepend" }];
    }
  };
}
function aegisSri() {
  let outDir = "dist";
  return {
    name: "aegis-sri",
    apply: "build",
    enforce: "post",
    configResolved(cfg) {
      outDir = typeof cfg.build.outDir === "string" ? cfg.build.outDir : outDir;
    },
    async closeBundle() {
      const htmlPath = path.resolve(outDir, "index.html");
      let html = fs.readFileSync(htmlPath, "utf8");
      const assetRefs = /* @__PURE__ */ new Set();
      html.replace(/(?:src|href)="(\/[^"]+)"/g, (_m, href) => {
        if (!/^https?:|^\/\//.test(href)) assetRefs.add(href);
        return _m;
      });
      for (const ref of assetRefs) {
        const file = path.resolve(outDir, ref.replace(/^\//, ""));
        if (!fs.existsSync(file)) continue;
        const hash = crypto.createHash("sha384").update(fs.readFileSync(file)).digest("base64");
        const integrity = `sha384-${hash}`;
        html = html.replace(new RegExp(`(<script[^>]*?src="${ref.replace(/\//g, "\\/")}")`), `$1 integrity="${integrity}"`).replace(new RegExp(`(<link[^>]*?href="${ref.replace(/\//g, "\\/")}")`), `$1 integrity="${integrity}"`);
      }
      fs.writeFileSync(htmlPath, html);
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), aegisObfuscate(), aegisCsp(), aegisSri()],
  server: {
    port: 5173
  },
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 1200
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3VzdGF2by9EZXNrdG9wL3Npc3RlbWFzX3Zhcmlvcy9JTkNMVVNJQV9BSVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2d1c3Rhdm8vRGVza3RvcC9zaXN0ZW1hc192YXJpb3MvSU5DTFVTSUFfQUkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2d1c3Rhdm8vRGVza3RvcC9zaXN0ZW1hc192YXJpb3MvSU5DTFVTSUFfQUkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgUGx1Z2luIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IGNyeXB0byBmcm9tIFwibm9kZTpjcnlwdG9cIjtcbmltcG9ydCBKYXZhU2NyaXB0T2JmdXNjYXRvciBmcm9tIFwiamF2YXNjcmlwdC1vYmZ1c2NhdG9yXCI7XG5cbi8vIFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFx1MjUwMFxuLy8gQUVHSVMgU0hJRUxEIFx1MDBCNyBwbHVnaW5zIGRlIGJ1aWxkXG4vLyBPYmZ1c2NhY2lcdTAwRjNuICsgQ1NQICsgU1JJIHNlIGFwbGljYW4gU09MTyBlbiBwcm9kdWNjaVx1MDBGM24gKGFwcGx5OlwiYnVpbGRcIikuXG4vLyBFbiBkZXYgZWwgSE1SL3dlYnNvY2tldHMgc2VndWlyXHUwMEVEYW4gZnVuY2lvbmFuZG8gc2luIHJlc3RyaWNjaW9uZXMuXG4vLyBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcdTI1MDBcblxuZnVuY3Rpb24gYWVnaXNPYmZ1c2NhdGUoKTogUGx1Z2luIHtcbiAgY29uc3Qgb2JmdXNjYXRvck9wdGlvbnMgPSB7XG4gICAgY29tcGFjdDogdHJ1ZSxcbiAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IHRydWUsXG4gICAgY29udHJvbEZsb3dGbGF0dGVuaW5nVGhyZXNob2xkOiAwLjc1LFxuICAgIGRlYWRDb2RlSW5qZWN0aW9uOiB0cnVlLFxuICAgIGRlYWRDb2RlSW5qZWN0aW9uVGhyZXNob2xkOiAwLjMsXG4gICAgZGVidWdQcm90ZWN0aW9uOiB0cnVlLFxuICAgIGRlYnVnUHJvdGVjdGlvbkludGVydmFsOiAxMDAwLFxuICAgIGRpc2FibGVDb25zb2xlT3V0cHV0OiB0cnVlLFxuICAgIHNlbGZEZWZlbmRpbmc6IHRydWUsXG4gICAgaWdub3JlSW1wb3J0czogdHJ1ZSxcbiAgICByZW5hbWVHbG9iYWxzOiB0cnVlLFxuICAgIHN0cmluZ0FycmF5OiB0cnVlLFxuICAgIHN0cmluZ0FycmF5RW5jb2Rpbmc6IFtcImJhc2U2NFwiXSBhcyAoXCJiYXNlNjRcIiB8IFwicmM0XCIpW10sXG4gICAgc3RyaW5nQXJyYXlUaHJlc2hvbGQ6IDAuNzUsXG4gICAgdHJhbnNmb3JtT2JqZWN0S2V5czogdHJ1ZSxcbiAgICB1bmljb2RlRXNjYXBlU2VxdWVuY2U6IGZhbHNlLFxuICB9O1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiYWVnaXMtb2JmdXNjYXRlXCIsXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICBlbmZvcmNlOiBcInBvc3RcIixcbiAgICBnZW5lcmF0ZUJ1bmRsZShfb3B0cywgYnVuZGxlKSB7XG4gICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIE9iamVjdC52YWx1ZXMoYnVuZGxlKSkge1xuICAgICAgICBpZiAoY2h1bmsudHlwZSAhPT0gXCJjaHVua1wiIHx8ICFjaHVuay5jb2RlKSBjb250aW51ZTtcbiAgICAgICAgLy8gU29sbyBvZnVzY2Ftb3MgdHJvem9zIGNvbiBjXHUwMEYzZGlnbyBwcm9waW8gZGUgbGEgYXBwIChubyB2ZW5kb3IvcmVhY3QpLlxuICAgICAgICBjb25zdCBoYXNBcHBDb2RlID0gT2JqZWN0LmtleXMoY2h1bmsubW9kdWxlcykuc29tZSgoaWQpID0+ICFpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSAmJiAhaWQuc3RhcnRzV2l0aChcIlxcMFwiKSk7XG4gICAgICAgIGlmICghaGFzQXBwQ29kZSkgY29udGludWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY2h1bmsuY29kZSA9IEphdmFTY3JpcHRPYmZ1c2NhdG9yLm9iZnVzY2F0ZShjaHVuay5jb2RlLCBvYmZ1c2NhdG9yT3B0aW9ucykuZ2V0T2JmdXNjYXRlZENvZGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBbYWVnaXNdIG9iZnVzY2F0aW9uIHNraXBwZWQgZm9yICR7Y2h1bmsubmFtZX06YCwgKGVyciBhcyBFcnJvcikubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBhZWdpc0NzcCgpOiBQbHVnaW4ge1xuICBjb25zdCBjc3AgPSBbXG4gICAgXCJkZWZhdWx0LXNyYyAnc2VsZidcIixcbiAgICBcInNjcmlwdC1zcmMgJ3NlbGYnXCIsXG4gICAgXCJzdHlsZS1zcmMgJ3NlbGYnICd1bnNhZmUtaW5saW5lJ1wiLFxuICAgIFwiaW1nLXNyYyAnc2VsZicgZGF0YTogaHR0cHM6XCIsXG4gICAgXCJmb250LXNyYyAnc2VsZicgZGF0YTogaHR0cHM6XCIsXG4gICAgXCJjb25uZWN0LXNyYyAnc2VsZidcIixcbiAgICBcIndvcmtlci1zcmMgJ3NlbGYnIGJsb2I6XCIsXG4gICAgXCJvYmplY3Qtc3JjICdub25lJ1wiLFxuICAgIFwiYmFzZS11cmkgJ3NlbGYnXCIsXG4gICAgXCJmb3JtLWFjdGlvbiAnc2VsZidcIixcbiAgICBcImZyYW1lLWFuY2VzdG9ycyAnbm9uZSdcIixcbiAgXS5qb2luKFwiOyBcIik7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJhZWdpcy1jc3BcIixcbiAgICBhcHBseTogXCJidWlsZFwiLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbCgpIHtcbiAgICAgIHJldHVybiBbeyB0YWc6IFwibWV0YVwiLCBhdHRyczogeyBcImh0dHAtZXF1aXZcIjogXCJDb250ZW50LVNlY3VyaXR5LVBvbGljeVwiLCBjb250ZW50OiBjc3AgfSwgaW5qZWN0VG86IFwiaGVhZC1wcmVwZW5kXCIgfV07XG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gYWVnaXNTcmkoKTogUGx1Z2luIHtcbiAgbGV0IG91dERpciA9IFwiZGlzdFwiO1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiYWVnaXMtc3JpXCIsXG4gICAgYXBwbHk6IFwiYnVpbGRcIixcbiAgICBlbmZvcmNlOiBcInBvc3RcIixcbiAgICBjb25maWdSZXNvbHZlZChjZmcpIHtcbiAgICAgIG91dERpciA9IHR5cGVvZiBjZmcuYnVpbGQub3V0RGlyID09PSBcInN0cmluZ1wiID8gY2ZnLmJ1aWxkLm91dERpciA6IG91dERpcjtcbiAgICB9LFxuICAgIGFzeW5jIGNsb3NlQnVuZGxlKCkge1xuICAgICAgY29uc3QgaHRtbFBhdGggPSBwYXRoLnJlc29sdmUob3V0RGlyLCBcImluZGV4Lmh0bWxcIik7XG4gICAgICBsZXQgaHRtbCA9IGZzLnJlYWRGaWxlU3luYyhodG1sUGF0aCwgXCJ1dGY4XCIpO1xuICAgICAgY29uc3QgYXNzZXRSZWZzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBodG1sLnJlcGxhY2UoLyg/OnNyY3xocmVmKT1cIihcXC9bXlwiXSspXCIvZywgKF9tOiBzdHJpbmcsIGhyZWY6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoIS9eaHR0cHM/OnxeXFwvXFwvLy50ZXN0KGhyZWYpKSBhc3NldFJlZnMuYWRkKGhyZWYpO1xuICAgICAgICByZXR1cm4gX207XG4gICAgICB9KTtcbiAgICAgIGZvciAoY29uc3QgcmVmIG9mIGFzc2V0UmVmcykge1xuICAgICAgICBjb25zdCBmaWxlID0gcGF0aC5yZXNvbHZlKG91dERpciwgcmVmLnJlcGxhY2UoL15cXC8vLCBcIlwiKSk7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhmaWxlKSkgY29udGludWU7XG4gICAgICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaChcInNoYTM4NFwiKS51cGRhdGUoZnMucmVhZEZpbGVTeW5jKGZpbGUpKS5kaWdlc3QoXCJiYXNlNjRcIik7XG4gICAgICAgIGNvbnN0IGludGVncml0eSA9IGBzaGEzODQtJHtoYXNofWA7XG4gICAgICAgIGh0bWwgPSBodG1sXG4gICAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cChgKDxzY3JpcHRbXj5dKj9zcmM9XCIke3JlZi5yZXBsYWNlKC9cXC8vZywgXCJcXFxcL1wiKX1cIilgKSwgYCQxIGludGVncml0eT1cIiR7aW50ZWdyaXR5fVwiYClcbiAgICAgICAgICAucmVwbGFjZShuZXcgUmVnRXhwKGAoPGxpbmtbXj5dKj9ocmVmPVwiJHtyZWYucmVwbGFjZSgvXFwvL2csIFwiXFxcXC9cIil9XCIpYCksIGAkMSBpbnRlZ3JpdHk9XCIke2ludGVncml0eX1cImApO1xuICAgICAgfVxuICAgICAgZnMud3JpdGVGaWxlU3luYyhodG1sUGF0aCwgaHRtbCk7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGFlZ2lzT2JmdXNjYXRlKCksIGFlZ2lzQ3NwKCksIGFlZ2lzU3JpKCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogXCJlczIwMjBcIixcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEyMDAsXG4gIH0sXG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLFNBQVMsb0JBQWlDO0FBQ2xYLE9BQU8sV0FBVztBQUNsQixP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
