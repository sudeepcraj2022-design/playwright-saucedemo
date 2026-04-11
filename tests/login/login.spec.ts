import { test, expect } from '@fixtures/fixtures'
import { ENV } from '@config/env';
import { RandomDataUtil } from '@utils/random-data-generator';
import { LOGIN_ERRORS } from 'constants/error-messages';

// ignore the storage state
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login functionality', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateToLoginPage();
    });

    test('Login successfully with valid credentials', { tag: ['@smoke', '@TC001'] }, async ({ loginPage, productsPage }) => {
        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);

        await expect(productsPage.getInventoryList()).toBeVisible();
    });

    test('Login failed with invalid credentials', { tag: ['@smoke', '@TC002'] }, async ({ loginPage }) => {
        await loginPage.login(RandomDataUtil.getFirstName(), RandomDataUtil.getPassword());
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(LOGIN_ERRORS.INVALID_USER);

    });

    test('Login failed with invalid Password', { tag: ['@TC003'] }, async ({ loginPage }) => {
        await loginPage.login(ENV.USERNAME, RandomDataUtil.getPassword());
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(LOGIN_ERRORS.INVALID_USER);

    });

    test('Login failed with missing Username', { tag: ['@TC004'] }, async ({ loginPage }) => {
        await loginPage.login('', ENV.PASSWORD);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(LOGIN_ERRORS.USERNAME_REQUIRED);

    });

    test('Login failed with missing Password', { tag: ['@TC005'] }, async ({ loginPage }) => {
        await loginPage.login(ENV.USERNAME, '');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(LOGIN_ERRORS.PASSWORD_REQUIRED);

    });

    test('Login failed with locked out User', { tag: ['@TC006'] }, async ({ loginPage }) => {
        await loginPage.login(ENV.LOCKED_USERNAME, ENV.PASSWORD);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(LOGIN_ERRORS.LOCKED_OUT);

    });

});