import { test, expect } from '@playwright/test';
import { FileListPage } from '../pages/fileListPage';
import { AlgorithmSidePanel } from '../pages/algorithmPanel';
import { SlideViewerPage } from '../pages/slideViewerPage';
import { LoginPage } from '../pages/loginPage';


test.describe("user authentication, search, dashboard page and running algorithm", () => {

    test("To login to the application, navigate to algorithm page and run algorithm", async ({ page }) => {

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