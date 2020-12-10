import {homePage} from "../../../support/pages/homePage";
import {registrationPage} from "../../../support/pages/registrationPage";
import {accountPage} from "../../../support/pages/accountPage";


Given(`I visit home page`, () => {
    cy.openHomePage()
})

When(`I click My Account and Sign Up link`, () => {
    homePage.navigateToRegistrationPage()
})

When(`I register user with {string}, {string}, {string}, {string} and {string}`,
    (firstName, lastName, phoneNumber, email, password) => {
    registrationPage.register(firstName, lastName, phoneNumber, email, password, password)
})

When(`I fill user info with {string}, {string}, {string}, {string}, {string} and {string} and click Sign In`,
    (firstName, lastName, phoneNumber, email, password, confirmPassword) => {
    registrationPage.register(firstName, lastName, phoneNumber, email, password, confirmPassword)
})

Then(`I should be navigated to accountPage with greeting message: Hi, {string} {string}`, (firstName, lastName) => {
    accountPage.getGreetingElement()
        .should('contain',  `Hi, ${firstName} ${lastName}`)
})

Then(`The error message {string} should be visible`, errorMessage => {
    registrationPage.getErrorMessage()
        .should('contain',  errorMessage)
})
