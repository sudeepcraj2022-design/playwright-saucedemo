import { test, expect } from '@fixtures/fixtures'

test('Mocking: Overwrite the article list', async ({ page }) => {

    // 1. Intercept any request to the articles API
    await page.route(/\/api\/tags/, async (route) => {
        console.log('!!! TRAP TRIGGERED !!!');

        // 2. Create the mock data
        const mockTags = {
            "tags": [
                "Luffy",
                "Zorro",
                "Sanji",
                "Nami",
                "Ussop",
                "Chopper"
            ]
        };

        //3. Fullfill the request
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockTags),
        });

    })

    //4. Navigate to the site
    await page.goto('https://demo.learnwebdriverio.com/')

    //5. Assertion
    await expect(page.locator('.tag-list').getByText('Luffy', { exact: false })).toBeVisible();

})