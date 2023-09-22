export class DeliveryDetails {
    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First name');
        this.lastName = page.getByPlaceholder('Last name');
        this.street = page.getByPlaceholder('Street');
        this.postCode = page.getByPlaceholder('Post code');
        this.city = page.getByPlaceholder('City');
        this.countryDropDown = page.locator('[data-qa="country-dropdown"]');
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
        await this.page.pause();
    }
}