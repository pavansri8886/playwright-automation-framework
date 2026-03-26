import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { FileListPage } from '../pages/fileListPage';
import { ReportGenPage } from '../pages/reportGenPage';

test.describe("Generate ICCR report", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login();
    });

    test("Generate ICCR report with patient details", async ({ page }) => {
        const fileListPage = new FileListPage(page);
        const reportGen = new ReportGenPage(page);

        await fileListPage.navigateToMyFiles();
        await reportGen.createReport();
        await reportGen.captureDetails();
    });

});