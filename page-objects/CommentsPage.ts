import { Page, Locator, expect } from '@playwright/test';

export class CommentsPage {
  readonly page: Page;
  readonly commentsSection: Locator;
  readonly addCommentInput: Locator;
  readonly submitCommentButton: Locator;
  readonly backToBooksButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commentsSection = page.locator('#commentsList');
    this.addCommentInput = page.locator('#commentInput');
    this.submitCommentButton = page.locator('#submitComment');
    this.backToBooksButton = page.locator('#backButton');
  }

  async verifyErrorComment() {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Comment cannot be empty.'); 
      await dialog.accept();
    }); 
  }

  async addComment(comment: string) {
    await this.addCommentInput.fill(comment);
    await this.submitCommentButton.click();
  }

  async verifyComment(comment: string) {
    await expect(this.commentsSection).toContainText(comment);
  }

  async goBackToBooks() {
    await this.backToBooksButton.click();
  }
}