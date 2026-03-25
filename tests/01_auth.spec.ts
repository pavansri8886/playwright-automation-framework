import { test, expect } from '@playwright/test';
import { FileListPage } from '../pages/fileListPage';
import { AlgorithmSidePanel } from '../pages/algorithmPanel';
import { SlideViewerPage } from '../pages/slideViewerPage';
import { LoginPage } from '../pages/loginPage';

test.describe("User Authentication Block", () => {

    test("User login to the application with valid credentials", async ({ page }) => {

        const loginPage = new LoginPage(page);
        const fileListPage = new FileListPage(page);
        const algorithmSidePanel = new AlgorithmSidePanel(page);
        const slideViewerPage = new SlideViewerPage(page);

        await loginPage.login();
        await fileListPage.openFile();
        await slideViewerPage.clickAlgorithmFromPanel();
        await algorithmSidePanel.runAlgorithm();
    });

});