import { test } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { getFirstUser} from "../utils/helper";

test.describe("Login Page verification", () => {
  test("User should be able to login", async ({ page }) => {
    const rows = await getFirstUser();
    const userName = rows[0].name;
    const loginPage = new LoginPage(page);
    await loginPage.goto("http://localhost:3000");
    await loginPage.selectUser(userName);
    await loginPage.enterSystem();
    await loginPage.verifyLoginSuccess();
  });
});
