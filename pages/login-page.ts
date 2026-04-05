import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    private readonly pageURL = '';
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;


    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]')
    
    }

    //Navigation Method
    async navigateToLoginPage() {
        await this.page.goto(this.pageURL);

    }

    //Action Methods

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

    }

    async clickContinueToRegister() {
        await this.loginButton.click();

    }

    //Getter methods
    getErrorMessage(){
        return this.errorMessage;
    }


}