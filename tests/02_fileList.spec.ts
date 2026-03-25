import { test } from '../fixtures/baseTest';
import { FileListPage } from '../pages/fileListPage';

test.describe("Dashboard page or File List Page", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test("Search for file and open it", async ({ page }) => {
        const fileListPage = new FileListPage(page);
        await fileListPage.openFile();
    });

});