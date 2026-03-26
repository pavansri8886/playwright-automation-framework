import { Page, expect } from '@playwright/test';
import { fileListLocators } from '../objectRepository/fileListLocators';
import testData from '../test-data/t1_run_algorithm_histo.json';

const fileName: string = testData.file_name || "";

export class FileListPage {
    constructor(private page: Page) { }
    //1. page is internal playwright object which is used to perform all the actions on the webpage
    // so we need to pass it in constructor and initialize it in this class to use it here.
    //2. public - can be access anywhere, but bypassing the encapsulation principle of OOPs.
    // and defeats the very purpose of page object pattern.

    //private → only the class that defined it can use this.page
    //protected → the class that defined it AND any subclasses can use this.page
    //public → everyone can access it, including outside code

    //method to navigate to file from search bar
    async searchFile(fileName: string) {
        await this.page.getByRole(fileListLocators.searchBar.role, { name: fileListLocators.searchBar.name }).isVisible();
        await this.page.getByRole(fileListLocators.searchBar.role, { name: fileListLocators.searchBar.name }).fill(fileName);
        await this.page.getByRole(fileListLocators.searchButton.role, { name: fileListLocators.searchButton.name }).click();
    }

    //method to open example files from quick access
    async navigateToExampleFiles() {
        await this.page.getByTestId(fileListLocators.clickExampleFilesQuickAccess.testId).isVisible();
        await this.page.getByTestId(fileListLocators.clickExampleFilesQuickAccess.testId).click();
    }

    //method to open my files from quick access
    async navigateToMyFiles() {
        await this.page.getByTestId(fileListLocators.clickMyFilesQuickAccess.testId).isVisible();
        await this.page.getByTestId(fileListLocators.clickMyFilesQuickAccess.testId).click();
    }

    //Select file and open it
    async selectFile(fileName: string) {
        const row = this.page.getByRole('cell', {
            name: new RegExp(fileName, 'i')
        });
        await row.hover();
        await row.click();
        await this.page.getByText(fileListLocators.openFile.text)
            .click({ force: true });
    }

    async openFile() {
        await this.page.goto('/');
        await this.searchFile(fileName);
        await this.selectFile(fileName);
    }

}