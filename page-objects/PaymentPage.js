import {expect} from "@playwright/test";

export class PaymentPage {
    constructor(page) {
    this.page = page;
    this.discountCode = page
        .frameLocator('[data-qa="active-discount-container"]')
        .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder('Discount code');
    this.activeDiscountButton = page.locator('[data-qa="submit-discount-button"]');
    this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
    this.totalWithDiscountValue =  page.locator('[data-qa="total-with-discount-value"]')
    this.totalValue = page.locator('[data-qa="total-value"]');
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

        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        expect(await this.totalWithDiscountValue.isVisible()).toBe(false)
        await this.activeDiscountButton.waitFor();
        await this.activeDiscountButton.click();

        await this.totalWithDiscountValue.waitFor();
        const totalDiscountValue = await this.totalWithDiscountValue.innerText();
        const totalAmount = await this.totalValue.innerText();

        expect(parseInt(totalDiscountValue.slice(0, totalDiscountValue.length -1 ))).toBeLessThan(parseInt(totalAmount.slice(0, totalAmount.length - 1)))
    }
}