import {test} from "@playwright/test";
import {MyAccountPage} from "../page-objects/MyAccountPage";
import {getLoginToken} from "./../api-calls/getLoginToken"

test.only("My account using cookie injection", async ({page})=>{
    const loginToken = await getLoginToken();
    console.warn({loginToken})

    const myAccount = new MyAccountPage(page);
    await myAccount.visit();

    await page.evaluate(([loginTokenInsideBrowserCode])=>{
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit();
    await myAccount.waitForPageHeading();
})
