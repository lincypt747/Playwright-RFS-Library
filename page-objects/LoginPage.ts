import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly enterSystemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator('#userSelect');
    this.enterSystemButton = page.locator('#enterSystem');
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async selectUser(username: string) {
    await this.userDropdown.selectOption(username);
  }

  async enterSystem() {
    await this.enterSystemButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page.locator('h1')).toHaveText('Books List');
  }
}
