import { test } from "@playwright/test";
import { DonatePage } from "../page-objects/DonatePage";
import { BooksPage } from "../page-objects/BooksPage";
import { LoginPage } from "../page-objects/LoginPage";
import { getFirstUser, resetDatabase } from "../utils/helper";

test.describe("Donate a Book", () => {
  test.beforeAll(async () => {
    await resetDatabase();
  });
  test("User should be able to donate a book", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const donatePage = new DonatePage(page);
    const booksPage = new BooksPage(page);
    const rows = await getFirstUser();
    const userName = rows[0].name;

    await loginPage.goto("http://localhost:3000");
    await loginPage.selectUser(userName);
    await loginPage.enterSystem();
    await loginPage.verifyLoginSuccess();
    await booksPage.verifyBooksDisplayed();
    await donatePage.openDonateModal();
    await donatePage.donateBook("New Book", "Author X", "Fiction");
    await donatePage.verifyDonationSuccess();
  });
});
