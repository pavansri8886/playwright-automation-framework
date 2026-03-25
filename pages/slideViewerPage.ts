import { Page } from '@playwright/test';
import { slideViewerLocators } from '../objectRepository/slideViewerLocators';

export class SlideViewerPage {
    constructor(private page: Page) { }

    async clickAlgorithmFromPanel() {
        await this.page.getByRole('menuitem', { name: 'bar-chart' }).getByLabel('bar-chart').click();
    }

}