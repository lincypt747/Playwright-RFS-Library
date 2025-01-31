import { expect, Locator, Page } from '@playwright/test';

export class BooksPage {
  readonly page: Page;
  readonly availableBooksTable: Locator;
  readonly unavailableBooksTable: Locator;
  readonly viewDetailsButton: (bookTitle: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.availableBooksTable = page.locator('#availableBooksTable');
    this.unavailableBooksTable = page.locator('#unavailableBooksTable');
    this.viewDetailsButton = (bookTitle: string) => page.getByRole('row', { name: `${bookTitle}` }).getByRole('button');
  }

  async verifyBooksDisplayed() {
    await expect(this.availableBooksTable).toBeVisible();
    await expect(this.unavailableBooksTable).toBeVisible();
  }

  async viewDetails(bookTitle: string) {
    await this.viewDetailsButton(bookTitle).click();
  }
}
