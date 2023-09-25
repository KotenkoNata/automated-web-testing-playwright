import {expect} from "@playwright/test";

export class PaymentPage {
    constructor(page) {
    this.page = page;
    this.discountCode = page
        .frameLocator('[data-qa="active-discount-container"]')
        .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder('Discount code');
    }

    activeDiscount = async ()=> {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();


        //Option 1 for leggy inputs: using .fill() with await expect()
        await this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);

        //Option 2 for leggy inputs: slow typing
        // await this.discountInput.focus();
        // await this.page.keyboard.type(code, {delay: 1000});
        // expect( await  this.discountInput.inputValue()).toBe(code)
    }
}