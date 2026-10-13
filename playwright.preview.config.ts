import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-preview',
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: [
    { command: 'npm run dev -- --hostname localhost --port 3000', url: 'http://localhost:3000', reuseExistingServer: true },
    { command: 'npm --prefix ../finde run dev:preview', url: 'http://localhost:5173/preview', reuseExistingServer: true },
    { command: 'npm --prefix ../house-review run dev:preview', url: 'http://localhost:5174/preview', reuseExistingServer: true },
    { command: 'npm --prefix ../invoice-generator run dev:preview', url: 'http://localhost:3001/create?demo=1', reuseExistingServer: true },
    { command: 'npm --prefix ../CodeGarden run dev:preview', url: 'http://localhost:3002/preview', reuseExistingServer: true },
  ],
});
