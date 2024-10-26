import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      PINATA_API_KEY: JSON.stringify(process.env.PINATA_API_KEY),
      PINATA_API_SECRET: JSON.stringify(process.env.PINATA_API_SECRET),
      PINATA_JWT: JSON.stringify(process.env.PINATA_JWT),
      MUMBAI_RPC_URL: JSON.stringify(process.env.MUMBAI_RPC_URL),
      PRIVATE_KEY: JSON.stringify(process.env.PRIVATE_KEY),
      CONTRACT_ADDRESS: JSON.stringify(process.env.CONTRACT_ADDRESS),
      PINATA_GATEWAY: JSON.stringify(process.env.PINATA_GATEWAY),
    },
  },
});