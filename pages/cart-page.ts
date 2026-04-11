import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page';

export class CartPage extends BasePage {

    private readonly pageURL = '/cart.html'
    private readonly cartItems: Locator;
    private readonly cartItemNames: Locator;
    private readonly removeFromCartButtons: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page)
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
        this.removeFromCartButtons = page.getByRole('button', { name: 'Remove' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }


    //Navigation method
    async navigateToCart() {
        this.page.goto(this.pageURL);
    }

    async isLoaded() {
        await expect(this.page.getByText('Your Cart')).toBeVisible();
    }

    //Action methods
    async removeProductFromCart(productName: string) {
        await this.cartItems
            .filter({ hasText: productName })
            .locator(this.removeFromCartButtons)
            .click()
    }

    async getCartItemNames() {
        return await this.cartItemNames.allInnerTexts();
    }

    //Getter methods
    getCartItems() {
        return this.cartItems;
    }




}