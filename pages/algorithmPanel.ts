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

    //
    async verifyAlgorithmSelected() {
        const isAlgorithmReady = await this.page.getByText('Ready').isVisible();
        if (!isAlgorithmReady) {
            await this.selectAlgorithm();
        } else {
            console.log("Algorithm already ready — skipping");
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

        // select Gleason Score from dropdown options
        await this.page.getByTitle('Gleason Score').click();

        // whole scan is default — just click Next directly
        await this.page.getByRole(
            algorithmLocators.nextButton.role,
            { name: algorithmLocators.nextButton.name }
        ).click();
    }

    async runAlgorithm() {
        await this.ensurePanelExpanded();
        await this.verifyAlgorithmSelected();
    }


}