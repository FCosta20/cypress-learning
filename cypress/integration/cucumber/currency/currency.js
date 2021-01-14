import {homePage} from "../../../support/pages/homePage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When(`I choose {string} currency code`, (currencyCode) => {
    homePage.getHeader()
        .chooseCurrency(currencyCode)
    cy.wait(1000)
})

Then(`I should have prices in appropriate currency code {string} and currency symbol {string}`, (currencyCode, currencySymbol) => {
    homePage.getFirstHotelPrice()
        .should('contain', currencySymbol)
    homePage.getFirstFrightPrice()
        .should('contain', currencyCode)
    homePage.getFirstTourPrice()
        .should('contain', currencySymbol)
    homePage.getFirstRentalPrice()
        .should('contain', currencySymbol)
    homePage.getFirstBoatPrice()
        .should('contain', currencySymbol)
})
