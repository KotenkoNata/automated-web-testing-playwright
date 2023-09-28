import {expect} from "@playwright/test";
import {Navigation} from "./Navigation";

const isDesktopViewport = (page) => {
     const size = page.viewportSize();
     return size.width >=600
}

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]');
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    }
    visit = async () =>{
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);

        if(isDesktopViewport(this.page)){
        const basketCountBeforeAdding = await navigation.getBasketCount();

        }
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket")

        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount();
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
}

    sortByCheapest = async ()=> {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption("price-asc");
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts();
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting);
    }
}