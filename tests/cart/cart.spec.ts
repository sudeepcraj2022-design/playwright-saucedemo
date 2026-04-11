import { test, expect } from '@fixtures/fixtures'
import { ProductNames } from '@constants/product-names';

test.describe('Product verification', () => {
    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductPage();
    })


    test('Add an item to cart then remove it', { tag: ['@smoke', '@TC015'] }, async ({ productsPage }) => {
        await productsPage.addProductToCart(ProductNames.BACKPACK);
        const cartCount = await productsPage.getCartCount();
        expect(cartCount).toBe(1);

        await productsPage.removeProductFromCart(ProductNames.BACKPACK);
        const updatedCartCount = await productsPage.getCartCount();
        expect(updatedCartCount).toBe(0);
    })

    test('Add multiple items to cart then remove it', { tag: ['@TC0016'] }, async ({ productsPage }) => {
        await productsPage.addMultipleProductsToCart([ProductNames.BACKPACK, ProductNames.BIKE_LIGHT])
        const cartCount = await productsPage.getCartCount();
        expect(cartCount).toBe(2);

        await productsPage.removeMultipleProductsFromCart([ProductNames.BACKPACK, ProductNames.BIKE_LIGHT])
        const updatedCartCount = await productsPage.getCartCount();
        expect(updatedCartCount).toBe(0);
    })

    test('Add an item and view it in cart',{ tag: ['@TC0017'] }, async ({ productsPage, cartPage }) => {
        const expectedProduct = ProductNames.BACKPACK;

        await productsPage.addProductToCart(expectedProduct);
        const cartCount = await productsPage.getCartCount();
        expect(cartCount).toBe(1);

        await productsPage.clickShoppingCart();
        await cartPage.isLoaded();

        const actualCartProduct = await cartPage.getCartItemNames()

        expect(actualCartProduct).toContain(expectedProduct);
        await cartPage.removeProductFromCart(expectedProduct);

        expect(cartPage.getCartItems()).not.toBeVisible();

    })

});