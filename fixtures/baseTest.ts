import { test as base } from '@playwright/test';

export const test = base;

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        await page.pause();
    }
});