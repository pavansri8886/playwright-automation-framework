import { test } from '@playwright/test'
import { AlgorithmSidePanel } from '../pages/algorithmPanel';
import { SlideViewerPage } from '../pages/slideViewerPage';

test.describe("Algorithm Running Block", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test("", ({ page }) => {
        const algorithmSidePanel = new AlgorithmSidePanel(page);
        const slideViewerPage = new SlideViewerPage(page);
        slideViewerPage.clickAlgorithmFromPanel();
        algorithmSidePanel.runAlgorithm();
    })
})