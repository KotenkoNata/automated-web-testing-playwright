export class PaymentPage {
    constructor(page) {
    this.page = page;
    this.discountCode = page
        .frameLocator('[data-qa="active-discount-container"]')
        .locator('[data-qa="discount-code"]');
    }

    activeDiscount = async ()=> {
        await this.discountCode.waitFor();
        await this.page.pause()
    }
}