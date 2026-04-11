# SauceLabs Advanced Automation Suite

Building on my previous experience, this project serves as a "best practices" showcase. It focuses on advanced Playwright configurations and strictly typed test data management.

### 🌟 Advanced Implementations
* **Environment Security:** Integrated `.env` files to manage sensitive credentials, ensuring no hardcoded user details exist in the repository.
* **Strict Typing with Enums & Constants:** Leveraged TypeScript Enums and Constants to pass test data (like Product Names and Error Messages), making the tests highly readable and less prone to typos.
* **Optimized Configuration:** Customized `playwright.config.ts` for:
    * **Custom TestID Attributes:** Mapping `data-test` for cleaner, stable locators.
    * **Path Aliases:** Configured for cleaner imports across the project.
    * **Parallel Execution:** Configured to handle independent browser contexts efficiently.
* **Role-Based Locators:** Prioritized accessibility-first locators (`getByRole`, `getByLabel`) for user-centric testing.

### 🛠 Tech Stack
* **Language:** TypeScript
* **Engine:** Playwright
* **Patterns:** Page Object Model (POM), Single Responsibility Principle
