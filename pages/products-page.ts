import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
    private readonly pageURL = '/inventory.html'
    private readonly inventoryList: Locator;


    constructor(page: Page) {
        super(page);
        this.inventoryList = page.locator('[data-test="inventory-list"]');
    }


    //Action methods
    async verifyPageLoaded() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    //Getter methods
    getInventoryList(){
        return this.inventoryList;
    }

}