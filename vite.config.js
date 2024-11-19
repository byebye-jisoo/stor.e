// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
      host: '127.0.0.1',
      port: 5050,
    },

    resolve: {
      alias: {
        three: path.resolve(__dirname, 'node_modules/three')
      }
    }

});
