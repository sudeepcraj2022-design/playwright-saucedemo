import { test, expect } from '@fixtures/fixtures'
import { ProductNames } from '@constants/product-names';
import { RandomDataUtil } from '@utils/random-data-generator';

test.describe('Product verification', () => {
    test.beforeEach(async ({ productsPage, cartPage}) => {
        await productsPage.navigateToProductPage();
        const productName = ProductNames.BACKPACK;
        await productsPage.addProductToCart(productName);
        await productsPage.clickShoppingCart();
        await cartPage.isLoaded();
        await cartPage.clickCheckout();
        await cartPage.yourInformationIsLoaded();

    })

    test('Checkout with empty fields', { tag: ['@TC018'] }, async ({ cartPage }) => {
        await cartPage.clickContinue();

        const errorMessage = await cartPage.getErrorMessageText()
        expect(errorMessage).toContain('Error: First Name is required');
    })

    test('Checkout with vaild details', { tag: ['@TC019'] }, async ({ cartPage }) => {

        await cartPage.checkoutWithDetails(
            RandomDataUtil.getFirstName(),
            RandomDataUtil.getLastName(),
            RandomDataUtil.getRandomPin())

        await cartPage.overviewIsLoaded();
        await cartPage.clickFinish();
        await expect(cartPage.getOrderCompleteMessage()).toBeVisible();
    })

})