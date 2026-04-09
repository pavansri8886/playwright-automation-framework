import { Page, expect } from '@playwright/test'
import { reportGenLocators } from '../objectRepository/reportGenLocators'
import testData from '../test-data/t2_generate_iccr_document.json'
import * as fs from 'fs'
import * as path from 'path'
import { PDFParse } from 'pdf-parse'

export class ReportGenPage {
    constructor(private page: Page) { }

    //this will take you from my files to report generation page by selecting type of report
    async createReport() {
        const createTextBtn = this.page.getByText('create', { exact: true });
        const createMenuBtn = this.page.getByRole('menuitem', { name: 'plus' });
        const createFloatBtn = this.page.getByRole('button', { name: 'plus' });

        if (await createTextBtn.isVisible()) {
            // case 1 — full screen
            await createTextBtn.click();
            await this.page.getByText('document').click();

        } else if (await createMenuBtn.isVisible()) {
            // case 2 — medium screen
            await createMenuBtn.click();
            await this.page.getByText('document').click();

        } else {
            // case 3 — CI collapsed
            await createFloatBtn.click();
            await this.page.getByRole('button', { name: 'audit' }).click();
        }

        await this.page.getByRole(
            reportGenLocators.templateSearchBar.role,
            { name: reportGenLocators.templateSearchBar.name }
        ).click();

        await this.page.getByRole('option', {
            name: testData.typeOfReport, exact: true
        }).click();

        await this.page.getByRole(
            reportGenLocators.okBTN.role,
            { name: reportGenLocators.okBTN.name }
        ).click();
    }

    //ICCR - Invasive Carcinoma - To capture details of given page
    async captureDetails() {
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('textbox').first().fill(testData.GivenName);
        await this.page.getByRole('textbox').nth(1).fill(testData.LastName);
        await this.page.getByRole('textbox').nth(2).fill(testData.PatientIdentifiers);
        await this.page.getByRole('textbox', { name: 'Select date' }).first().fill(testData.DOB);
        await this.page.getByRole('textbox', { name: 'Select date' }).nth(1).fill(testData.DOR);
        await this.page.getByRole('textbox').nth(5).fill(testData.LabNumber);
        await this.radiobuttons();

        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByRole('button', { name: 'Generate PDF' }).first().click(),
        ]);

        const downloadPath = path.join('downloads', download.suggestedFilename());
        await download.saveAs(downloadPath);
        console.log(`PDF saved to: ${downloadPath}`);

        await this.verifyPdfHeader(downloadPath);

    }

    async verifyPdfHeader(filePath: string) {
        const buffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        await parser.destroy();
        const firstLine = result.text.split('\n').find((line: string) => line.trim().length > 0) ?? '';
        console.log(`PDF header text: ${firstLine}`);
        expect(firstLine.trim()).toBeTruthy();
    }

    async radiobuttons() {
        await this.page.getByRole('radio', { name: 'Information not provided' }).first().check();
        await this.page.getByRole('radio', { name: 'Information not provided' }).nth(1).check();
        await this.page.getByRole('radio', { name: 'No' }).nth(3).check();
        await this.page.getByRole('radio', { name: 'No' }).nth(5).check();
        await this.page.getByRole('radio', { name: 'Yes' }).nth(2).check();
        await this.page.getByRole('radio', { name: 'None' }).nth(1).check();
        await this.page.locator('input[type="text"]').nth(4).click();
        await this.page.locator('input[type="text"]').nth(4).fill('220');
        await this.page.getByRole('radio', { name: 'Yes' }).nth(4).check();
        console.log("PDF generated successfully");
    }

}