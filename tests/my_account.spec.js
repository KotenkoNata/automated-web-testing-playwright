import {test} from "@playwright/test";
import {MyAccountPage} from "../page-objects/MyAccountPage";

test.only("My account using cookie injection", async ({page})=>{
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
})