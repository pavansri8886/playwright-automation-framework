import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { FileListPage } from '../pages/fileListPage';
import { ReportGenPage } from '../pages/reportGenPage';

test.describe("Generate ICCR report", () => {

    test("Generate ICCR report with patient details", async ({ page }) => {
        const fileListPage = new FileListPage(page);
        const reportGen = new ReportGenPage(page);
        const loginPage = new LoginPage(page);
        await loginPage.login();
        await fileListPage.navigateToMyFiles();
        await reportGen.createReport();
        await reportGen.captureDetails();
    });

});