import { test } from "@playwright/test";
import { CommentsPage } from "../page-objects/CommentsPage";
import { DonatePage } from "../page-objects/DonatePage";
import { BooksPage } from "../page-objects/BooksPage";
import { LoginPage } from "../page-objects/LoginPage";
import { getFirstUser, resetDatabase } from "../utils/helper";

test.describe("Add a comment to a Book", () => {
  test.beforeAll(async () => {
    await resetDatabase();
  });
  test("User should be able to comment a book", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const donatePage = new DonatePage(page);
    const booksPage = new BooksPage(page);
    const commentsPage = new CommentsPage(page);
    const rows = await getFirstUser();
    const userName = rows[0].name;

    await loginPage.goto("http://localhost:3000");
    await loginPage.selectUser(userName);
    await loginPage.enterSystem();
    await loginPage.verifyLoginSuccess();
    await booksPage.verifyBooksDisplayed();
    await donatePage.openDonateModal();
    await donatePage.donateBook("New Book", "Author X", "Fiction");
    //await donatePage.verifyDonationSuccess();
    await booksPage.verifyBooksDisplayed();
    await booksPage.viewDetails("New Book Author X");
    await commentsPage.addComment('');
    await commentsPage.verifyErrorComment();
    await commentsPage.addComment("This is a beautiful book");
    await commentsPage.verifyComment("This is a beautiful book");
    await commentsPage.goBackToBooks();
    await booksPage.verifyBooksDisplayed();
  });
});
