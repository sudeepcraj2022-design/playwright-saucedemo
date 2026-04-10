import { test, expect } from '@fixtures/fixtures'
import { SortOptions } from 'constants/sort-options';
import { SortHelper } from '@utils/sort-helper';

test.describe('Product verification', () => {
    test.beforeEach(async ({ productsPage }) => {
        await productsPage.navigateToProductPage();
    })

    test('All product should be sorted by Name: A-Z', { tag: ['@TC011'] }, async ({ productsPage }) => {
        const actualNames = await productsPage.getProductNames().allInnerTexts();
        const expectedNames = [...actualNames].sort();

        expect(actualNames).toEqual(expectedNames);
    })

    test('All product should be sorted by Name: Z-A', { tag: ['@TC012'] }, async ({ productsPage }) => {
                
        await productsPage.sortProducts(SortOptions.NAME_DESC);
        const actualNames = await productsPage.getProductNames().allInnerTexts();

        const expectedNames = SortHelper.getNamesDescending(actualNames);
        
        expect(actualNames).toEqual(expectedNames); 
    })

    test('All product should be sorted by Price: low to high', { tag: ['@TC013'] }, async ({ productsPage }) => {
                
        await productsPage.sortProducts(SortOptions.PRICE_LTOH);
        const uiPriceStrings = await productsPage.getProductPrices().allInnerTexts();

        const actualPrices = uiPriceStrings.map(SortHelper.parsePrice)
        const expectedPrices = SortHelper.getPricesAscending(uiPriceStrings)
        
        expect(actualPrices).toEqual(expectedPrices); 
    })

    test('All product should be sorted by Price: high to low', { tag: ['@TC014'] }, async ({ productsPage }) => {
                
        await productsPage.sortProducts(SortOptions.PRICE_HTOL);
        const uiPriceStrings = await productsPage.getProductPrices().allInnerTexts();

        const actualPrices = uiPriceStrings.map(SortHelper.parsePrice);
        const expectedPrices = SortHelper.getPricesDescending(uiPriceStrings)
        
        expect(actualPrices).toEqual(expectedPrices); 
    })



});