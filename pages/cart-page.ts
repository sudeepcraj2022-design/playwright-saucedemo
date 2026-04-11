import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page';

export class CartPage extends BasePage {

    private readonly pageURL = '/cart.html'
    private readonly cartItems: Locator;
    private readonly cartItemNames: Locator;
    private readonly removeFromCartButtons: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueButton: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly zipCodeField: Locator;
    private readonly errorMessage: Locator;
    private readonly finishButton: Locator;
    private readonly orderCompleteMessage: Locator;

    constructor(page: Page) {
        super(page)
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
        this.removeFromCartButtons = page.getByRole('button', { name: 'Remove' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true});
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.zipCodeField = page.getByPlaceholder('Zip/Postal Code');
        this.errorMessage = page.locator('[data-test="error"]');
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.orderCompleteMessage = page.locator('[data-test="complete-header"]');

    }


    //Navigation and Page loaded methods
    async navigateToCart() {
        this.page.goto(this.pageURL);
    }

    async isLoaded() {
        await expect(this.page.getByText('Your Cart')).toBeVisible();
    }

    async yourInformationIsLoaded() {
        await expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
    }

    async overviewIsLoaded() {
        await expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    }

    //Action methods
    async clickCheckout(){
        this.checkoutButton.click();
    }

    async clickContinue(){
        this.continueButton.click();
    }

    async clickFinish(){
        await this.finishButton.click();
    }

    async getErrorMessageText(){
         return this.errorMessage.innerText();
    }

    async checkoutWithDetails(firstName: string, lastName: string, zipCode: string){

        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);

        await this.continueButton.click();
    }

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

    getOrderCompleteMessage(){
        return this.orderCompleteMessage;
    }




}