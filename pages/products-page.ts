import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page';
import { SortOptions } from 'constants/sort-options';

export class ProductsPage extends BasePage {
    private readonly pageURL = '/inventory.html'
    private readonly inventoryList: Locator;
    private readonly inventoryItem: Locator;
    private readonly sortingDropDown: Locator;


    constructor(page: Page) {
        super(page);
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.inventoryItem = page.locator('[data-test="inventory-list"]');
        this.sortingDropDown = page.locator('[data-test="product-sort-container"]');
    }

    //Navigation Method
    async navigateToProductPage() {
        await this.page.goto(this.pageURL);

    }

    //Action methods
    async sortProducts(option: SortOptions) {
        await this.sortingDropDown.selectOption(option);
        
    }

    //Getter methods
    getInventoryList() {
        return this.inventoryList;
    }

    getProductImages(){
        return this.inventoryItem.locator('img.inventory_item_img')
    }

    getProductDescriptions(){
        return this.inventoryItem.locator('[data-test="inventory-item-desc"]')
    }

    getProductNames(){
        return this.inventoryItem.locator('[data-test="inventory-item-name"]')
    }

    getProductPrices(){
        return this.inventoryItem.locator('[data-test="inventory-item-price"]')
    }

}