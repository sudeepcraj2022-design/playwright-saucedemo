import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page';
import { SortOptions } from 'constants/sort-options';

export class ProductsPage extends BasePage {
    private readonly pageURL = '/inventory.html'
    private readonly inventoryList: Locator;
    private readonly inventoryItem: Locator;
    private readonly sortingDropDown: Locator;
    private readonly addtoCartButtons: Locator;
    private readonly removeFromCartButtons: Locator;
    private readonly cartBadge: Locator;
    private readonly shoppingCart: Locator;


    constructor(page: Page) {
        super(page);
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.inventoryItem = page.locator('[data-test="inventory-item"]');
        this.sortingDropDown = page.locator('[data-test="product-sort-container"]');
        this.addtoCartButtons = page.getByRole('button', { name: 'Add to cart' });
        this.removeFromCartButtons = page.getByRole('button', { name: 'Remove' });
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.shoppingCart = page.locator('[data-test="shopping-cart-link"]');
    }

    //Navigation Method
    async navigateToProductPage() {
        await this.page.goto(this.pageURL);

    }

    //Action methods
    async sortProducts(option: SortOptions) {
        await this.sortingDropDown.selectOption(option);

    }

    async clickShoppingCart(){
        this.shoppingCart.click();
    }

    async addProductToCart(productName: string) {
        await this.inventoryItem
            .filter({ hasText: productName })
            .locator(this.addtoCartButtons)
            .click()
    }

    async removeProductFromCart(productName: string) {
        await this.inventoryItem
            .filter({ hasText: productName })
            .locator(this.removeFromCartButtons)
            .click()
    }

    async addMultipleProductsToCart(productNames: string[]) {
        for (const productName of productNames) {
            await this.inventoryItem
                .filter({ hasText: productName })
                .locator(this.addtoCartButtons)
                .click();
        }

    }

    async removeMultipleProductsFromCart(productNames: string[]) {
        for (const productName of productNames) {
            await this.inventoryItem
                .filter({ hasText: productName })
                .locator(this.removeFromCartButtons)
                .click();
        }
    }

    async getCartCount() {
        if (await this.cartBadge.isVisible()) {
            const countText = await this.cartBadge.innerText();
            return parseInt(countText);
        }
        return 0;
    }

    //Getter methods
    getInventoryList() {
        return this.inventoryList;
    }

    getProductImages() {
        return this.inventoryItem.locator('img.inventory_item_img')
    }

    getProductDescriptions() {
        return this.inventoryItem.locator('[data-test="inventory-item-desc"]')
    }

    getProductNames() {
        return this.inventoryItem.locator('[data-test="inventory-item-name"]')
    }

    getProductPrices() {
        return this.inventoryItem.locator('[data-test="inventory-item-price"]')
    }

}