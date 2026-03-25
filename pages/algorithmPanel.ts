import { Page, expect } from '@playwright/test'
import { algorithmLocators } from '../objectRepository/algorithmLocators'

export class AlgorithmSidePanel {
    constructor(private page: Page) { }

    async ensureAlgorithmPanelExpanded() {
        const isBannerVisible = await this.page.getByText(algorithmLocators.researchOnlyBanner.text).isVisible();
        if (!isBannerVisible == true) {
            await this.page.getByRole(algorithmLocators.algorithmPanelExpand.role, {
                name: algorithmLocators.algorithmPanelExpand.name
            }).click();
        }
    }

    async verifyAlgorithmSelected() {
        const isAlgorithmNameSelected = await this.page.getByText(algorithmLocators.algorithmName.text).isVisible();
        const isAlgorithmReady = await this.page.getByText(algorithmLocators.algorithmReady.text).isVisible();
        if (!isAlgorithmNameSelected && !isAlgorithmReady) {
            await this.selectAlgorithm();
        }
    }

    async selectAlgorithm() {
        await this.page.getByRole(algorithmLocators.runAlgorithmButton.role,
            { name: algorithmLocators.runAlgorithmButton.name }).click();
        await this.page.getByRole(algorithmLocators.selectAlgorithmDropDown.role,
            { name: algorithmLocators.selectAlgorithmDropDown.name }).click();

        await this.page.getByText(algorithmLocators.algorithmOptions.text).click();
        await this.page.getByRole(
            algorithmLocators.scanSelectionDropDown.role
        ).nth(algorithmLocators.scanSelectionDropDown.index).click();
        await this.page.getByText(
            algorithmLocators.selectWholeScan.text
        ).nth(algorithmLocators.selectWholeScan.index).click();
        await this.page.getByRole(algorithmLocators.nextButton.role, { name: algorithmLocators.nextButton.name }).click();
    }

    async runAlgorithm() {
        await this.ensureAlgorithmPanelExpanded();
        await this.verifyAlgorithmSelected();
        // await this.page.getByRole(algorithmLocators.runAlgorithmButton.role,
        //     { name: algorithmLocators.runAlgorithmButton.name }).click();
    }


}