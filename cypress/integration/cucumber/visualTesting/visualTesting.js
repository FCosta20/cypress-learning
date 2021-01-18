import {homePage} from "../../../support/pages/homePage";
import {matchElementScreenshot, matchPageSnapshot} from "../../../support/utils/screenshotUtils";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I open flight form', () => {
    homePage.openFlightForm()
})

When('I navigate to login page', () => {
    homePage.getHeader()
        .navigateToLoginPage()
})

Then('I match flight form snapshot', () => {
    matchElementScreenshot(homePage.getFlightForm())
})

Then('I match page snapshot snapshot', () => {
    matchPageSnapshot()
})