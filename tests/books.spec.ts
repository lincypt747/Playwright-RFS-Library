import { test } from "@playwright/test";
import { BooksPage } from "../page-objects/BooksPage";
import { LoginPage } from "../page-objects/LoginPage";
import { getFirstUser, resetDatabase } from "../utils/helper";

test.describe("Books Page verification", () => {
  test.beforeAll(async () => {
    await resetDatabase();
  });

  test("User should be able to login", async ({ page }) => {
    const rows = await getFirstUser();
    const userName = rows[0].name;
    const loginPage = new LoginPage(page);
    await loginPage.goto("http://localhost:3000");
    await loginPage.selectUser(userName);
    await loginPage.enterSystem();
    await loginPage.verifyLoginSuccess();
  });
  test("Books list should be visible", async ({ page }) => {
    const booksPage = new BooksPage(page);
    await booksPage.verifyBooksDisplayed();
  });
});
