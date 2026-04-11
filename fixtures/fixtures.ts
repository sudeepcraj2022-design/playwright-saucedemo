import { test as base} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '@pages/cart-page';

//1. Fixture Type declaration
type MyFixtures = {
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
}

//2. Extend the base test object
export const test = base.extend<MyFixtures> ({
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productsPage: async({page}, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    cartPage: async({page}, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    }

});

//3. Export expect so you don't have to import it everywhere
export { expect } from '@playwright/test';