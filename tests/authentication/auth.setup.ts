import{test as setup, expect} from '@fixtures/fixtures'
import { ENV } from '@config/env';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async({page, loginPage, productsPage}) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await expect(productsPage.getInventoryList()).toBeVisible();
    await page.context().storageState({ path: authFile });
})