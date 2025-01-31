import { test, expect } from '@playwright/test';
import { DonatePage } from '../page-objects/DonatePage';
import { BooksPage } from '../page-objects/BooksPage';
import { LoginPage } from '../page-objects/LoginPage';
import { getFirstUser } from '../utils/helper';

test('Verify error messages in donate form', async ({ page }) => {
  const donatePage = new DonatePage(page);
  const booksPage = new BooksPage(page);
  const rows = await getFirstUser();
  const userName = rows[0].name; 
  const loginPage = new LoginPage(page);
  await loginPage.goto('http://localhost:3000');
  await loginPage.selectUser(userName);
  await loginPage.enterSystem();
  await loginPage.verifyLoginSuccess();
  await booksPage.verifyBooksDisplayed();
  await donatePage.openDonateModal();
  //Title required
  await donatePage.donateBook('', 'Author X', 'Fiction'); 
  expect(await donatePage.isTitleValid()).toBe(false);
  console.log(donatePage.getTitleValidationMessage());
  expect(await donatePage.getTitleValidationMessage()).toBe('Please fill out this field.');
  // Author required
  await donatePage.donateBook('Title', '', 'Fiction'); 
  expect(await donatePage.isAuthorValid()).toBe(false);
  console.log(donatePage.getAuthorValidationMessage());
  expect(await donatePage.getAuthorValidationMessage()).toBe('Please fill out this field.');
});
