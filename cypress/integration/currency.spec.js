/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";

describe('Currency suite', () => {

    let currencies = []

    before(() => {
        cy.fixture('currencies').then(localCurrencies => {
            currencies = localCurrencies;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    // verify that chosen currency code in header should have appropriate currency symbol in prices
    // to recommended hotel, flights etc...
    it('currency code should have appropriate currency symbol in prices', () => {

        currencies.forEach(currency => {
            homePage.getHeader()
                .chooseCurrency(currency.currencyCode)
            cy.wait(1000)

            homePage.getFirstHotelPrice()
                .should('contain', currency.currencySymbol)
            homePage.getFirstFrightPrice()
                .should('contain', currency.currencyCode)
            homePage.getFirstTourPrice()
                .should('contain', currency.currencySymbol)
            homePage.getFirstRentalPrice()
                .should('contain', currency.currencySymbol)
            homePage.getFirstBoatPrice()
                .should('contain', currency.currencySymbol)
        })

    })

})
