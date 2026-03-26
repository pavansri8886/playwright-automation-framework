import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({

  // where to find tests
  testDir: './tests',

  // how tests run — one at a time, retry once on failure
  timeout: 60000,
  fullyParallel: false,
  workers: 1,
  retries: 0,

  // browser settings applied to all tests
  use: {
    baseURL: process.env.BASE_URL || 'https://platform.cancercenter.ai',
    headless: process.env.CI ? true : false,
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    viewport: { width: 1280, height: 720 },
    // viewport: null,
    
    launchOptions: {
      // args: ['--start-maximized'],
    },
  },

  // test reports — html for humans, junit for ci/cd, list for terminal
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'results/results.xml' }],
    ['list'],
  ],

  // where screenshots, videos and traces are saved
  outputDir: 'test-results',

  projects: [

    // main browser — runs all spec files in order
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
      testMatch: [
        '**/t1_run_algorithm_histo.spec.ts',
        '**/t2_generate_iccr_document.spec.ts',
      ],
    },

  ],
});