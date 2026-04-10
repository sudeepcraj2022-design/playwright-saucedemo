import { test, expect } from '@fixtures/fixtures'

test.describe('Product verification', () => {
    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductPage();
    })

    //Product visibility
    test('All products should be visible', { tag: ['@smoke', '@TC006'] }, async ({ page, productsPage }) => {
        await expect(productsPage.getInventoryList()).toBeVisible();
    })

    test('All product images should be visible', { tag: ['@TC007'] }, async ({ productsPage }) => {
        const imageLocator = productsPage.getProductImages();
        await expect(imageLocator).toHaveCount(6);

        const imageArray = await imageLocator.all();
        for (const image of imageArray) {
            await expect(image).toBeVisible();
        }
    })

    test('All product names should be visible', { tag: ['@TC008'] }, async ({ productsPage }) => {
        const nameLocator = productsPage.getProductNames();
        await expect(nameLocator).toHaveCount(6);

        const nameArray = await nameLocator.all();
        for (const name of nameArray) {
            await expect(name).toBeVisible();
        }
    })

    test('All product descriptions should be visible', { tag: ['@TC009'] }, async ({ productsPage }) => {
        const descriptionLocator = productsPage.getProductDescriptions()
        await expect(descriptionLocator).toHaveCount(6);

        const descriptionArray = await descriptionLocator.all();
        for (const description of descriptionArray) {
            await expect(description).toBeVisible();
        }
    })

    test('All product prices should be visible', { tag: ['@TC010'] }, async ({ productsPage }) => {
        const pricesLocator = productsPage.getProductPrices();
        await expect(pricesLocator).toHaveCount(6);

        const pricesArray = await pricesLocator.all();
        for (const price of pricesArray) {
            await expect(price).toBeVisible();
        }
    })


});