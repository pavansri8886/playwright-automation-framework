import { Page, expect } from "@playwright/test";
import { loginLocators } from "../objectRepository/loginLocators";

//getting the credentails from the env file without hardcoding them in this page
const email = process.env.TEST_EMAIL || "";
const password = process.env.TEST_PASSWORD || "";

export class LoginPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // "Page" - type of ts and "page" - creating/declaring a property
    // constructor(private page: Page){} // we can also mention like this instead of above

    //Implicit wait for Selenium
    //driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

    //In playwright await can be considered as equivalent to implicit wait.

    //Explicit wait for Selenium
    //WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    //wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("elementId")));

    //below can be considered as explicit wait in playwright
    //await page.locator('#login').waitFor();
    //await expect(page.locator('#login')).toBeVisible();
    //await page.waitForURL('**/dashboard');
    //await page.waitForSelector('#dashboard');

    async goto() {
        await this.page.goto("/");
    }

    async verifyHeaderIsVisible() {
        await this.page.locator(
            loginLocators.headerOfPage.locator
        ).isVisible();
    }

    async clickLogIn() {
        await this.page.getByRole(
            loginLocators.logInButton.role,
            { name: loginLocators.logInButton.name }
        ).click();
    }

    async fillEmail(email: string) {
        await this.page.getByRole(
            loginLocators.emailField.role, { name: loginLocators.emailField.name }
        ).fill(email);
    }

    async fillPassword(password: string) {
        await this.page.getByRole(
            loginLocators.passwordField.role, { name: loginLocators.passwordField.name }
        ).fill(password);
    }

    async clickSignIn() {
        await this.page.getByRole(
            loginLocators.signInButton.role, { name: loginLocators.signInButton.name }
        ).click();
    }

    async verifyDashboardWelcomeMessage(expectedMessage: string) {
        // const actualMessage = await this.page.locator(loginLocators.dashboardWelcomeMessage.locator).textContent();
        //expect(await this.page.locator(loginLocators.dashboardWelcomeMessage.locator).textContent()).toEqual(expectedMessage);
        await expect(this.page.locator(loginLocators.dashboardWelcomeMessage.locator)).toHaveText(expectedMessage);
    }

    //login method

    async login() {
        await this.goto();
        // await this.verifyHeaderIsVisible();
        await this.clickLogIn();
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignIn();
        await this.verifyDashboardWelcomeMessage("Hello " + process.env.FIRST_NAME);
    }

}
