import { expect, Locator, Page } from "@playwright/test";

export class DonatePage {
  readonly page: Page;
  readonly donateButton: Locator;
  readonly titleInput: Locator;
  readonly authorInput: Locator;
  readonly typeInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.donateButton = page.locator("#donateBooksButton");
    this.titleInput = page.locator("#title");
    this.authorInput = page.locator("#author");
    this.typeInput = page.locator("#type");
    this.submitButton = page.locator(".submit-button");
  }

  async openDonateModal() {
    await this.donateButton.click();
  }

  async donateBook(title: string, author: string, type: string) {
    await this.titleInput.fill(title);
    await this.authorInput.fill(author);
    await this.typeInput.fill(type);
    await this.submitButton.click();
  }

  async verifyDonationSuccess() {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Book donated successfully!'); 
      await dialog.accept();
    }); 
  }

  async isTitleValid() {
    return await this.titleInput.evaluate((input: HTMLInputElement) =>
      input.checkValidity()
    );
  }

  async getTitleValidationMessage(): Promise<string> {
    return await this.titleInput.evaluate(
      (input: HTMLInputElement) => input.validationMessage
    );
  }

  async isAuthorValid() {
    return await this.authorInput.evaluate((input: HTMLInputElement) =>
      input.checkValidity()
    );
  }

  async getAuthorValidationMessage(): Promise<string> {
    return await this.authorInput.evaluate(
      (input: HTMLInputElement) => input.validationMessage
    );
  }
}
