import { Page, Locator } from "@playwright/test";

export class BasePage {
    protected readonly page: Page;


    constructor(page: Page) {
        this.page = page;


    }

    //Action Methods:

    async navigateTo(path: string) {
        // This combines with your URL in the config
        await this.page.goto(path);
    }



    async waitForElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
}