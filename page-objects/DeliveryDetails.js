import {expect} from "@playwright/test";

export class DeliveryDetails {
    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First name');
        this.lastName = page.getByPlaceholder('Last name');
        this.street = page.getByPlaceholder('Street');
        this.postCode = page.getByPlaceholder('Post code');
        this.city = page.getByPlaceholder('City');
        this.countryDropDown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' });
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
    }

    fillDetails = async ({firstName,lastName, street, postCode, city, countryDropDown})=> {
        await this.firstName.waitFor();
        await this.firstName.fill(firstName);

        await this.lastName.waitFor();
        await this.lastName.fill(lastName);

        await this.street.waitFor();
        await this.street.fill(street);

        await this.postCode.waitFor();
        await this.postCode.fill(postCode);

        await this.city.waitFor();
        await this.city.fill(city);

        await this.countryDropDown.waitFor();
        await this.countryDropDown.selectOption(countryDropDown);
    }

    saveDetails = async ()=>{
        const addressCountBeforeSaving = await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving+1);

        await this.savedAddressFirstName.first().waitFor();
        expect(await this.savedAddressFirstName.first().innerText())
            .toBe(await this.firstName.inputValue())

        await this.savedAddressLastName.first().waitFor();
        expect(await this.savedAddressLastName.first().innerText())
            .toBe(await this.lastName.inputValue())

        await this.savedAddressStreet.first().waitFor();
        expect(await this.savedAddressStreet.first().innerText())
            .toBe(await this.street.inputValue());

        await this.savedAddressPostCode.first().waitFor();
        expect(await this.savedAddressPostCode.first().innerText())
            .toBe(await this.postCode.inputValue());

        await this.savedAddressCity.first().waitFor();
        expect(await this.savedAddressCity.first().innerText())
            .toBe(await this.city.inputValue());

        await this.savedAddressCountry.first().waitFor();
        expect(await this.savedAddressCountry.first().innerText())
            .toBe(await this.countryDropDown.inputValue())
    }

    continueToPayment = async ()=>{
        await  this.continueToPaymentButton.waitFor();
        await  this.continueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/, {timeout: 5000})

    }
}