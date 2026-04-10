import { Page, expect } from '@playwright/test'
import { algorithmLocators } from '../objectRepository/algorithmLocators'

export class AlgorithmSidePanel {
    constructor(private page: Page) { }

    //to check if panel is expanded or not and expand if closed
    async ensurePanelExpanded() {
        const panel = this.page.locator('.ant-collapse-header')
            .filter({ hasText: 'Algorithms' });
        const isExpanded = await panel.getAttribute('aria-expanded');
        if (isExpanded === 'false') {
            await panel.click();
            await this.page.waitForTimeout(500);
        }
    }

    //to check if algo is selected
    async verifyAlgorithmSelected() {
        await this.page.waitForTimeout(700);
        const isAlgorithmReady = await this.page.getByText('Ready').isVisible();
        const isAlgorithmProcessing = await this.page.getByText('Processing').isVisible();
        if (isAlgorithmReady) {
            await this.page.waitForTimeout(2000);
            await this.page.screenshot({ path: 'test-results/my-screenshot.png' });
            console.log("Algorithm is Ready")
        } else if (isAlgorithmProcessing) {
            await this.page.waitForTimeout(2000);
            await this.page.screenshot({ path: 'test-results/my-screenshot.png' });
            console.log("Algorithm is Processing")
        }
        else {
            await this.selectAlgorithm();
            console.log("Algorithm already ready or processing — skipping");
        }
    }

    async selectAlgorithm() {
        // click run algorithm button
        await this.page.getByRole(
            algorithmLocators.runAlgorithmButton.role,
            { name: algorithmLocators.runAlgorithmButton.name }
        ).click();

        // click algorithm dropdown
        await this.page.getByRole('combobox', { name: '* Select algorithm' }).click();

        // Gleason Score dropdown
        await this.page.getByTitle('Gleason Score').click();

        // whole scan option
        await this.page.getByRole(
            algorithmLocators.nextButton.role,
            { name: algorithmLocators.nextButton.name }
        ).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByText('Processing').waitFor({ state: 'visible' }); // wait untill visible equivalent
        await this.page.screenshot({ path: 'test-results/my-screenshot.png' });
        // await this.page.screenshot({
        //     path: 'test-results/my-screenshot.png',
        //     fullPage: true  // captures entire scrollable page
        // });
        await this.page.waitForTimeout(2000);
        console.log("Algorithm selected successfully")
    }

    async runAlgorithm() {
        await this.ensurePanelExpanded();
        await this.verifyAlgorithmSelected();
    }


}