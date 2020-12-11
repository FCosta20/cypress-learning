import {homePage} from "../../../support/pages/homePage";
import {accountPage} from "../../../support/pages/accountPage";
import {loginPage} from "../../../support/pages/loginPage";


Given('I visit home page', () => {
    cy.openHomePage()
})

When('I click My Account and Login link', () => {
    homePage.navigateToLoginPage()
})

When(`I login with {string} and {string}`, (email, password) => {
    loginPage.login(email, password)
})

When('I login as following', dataTable => {
    dataTable.hashes().forEach(row => {
        loginPage.clearInputs()
        loginPage.login(row.email, row.password)
    })
})

Then(`I should be navigated to accountPage with greeting message: Hi, {string} {string}`, (firstName, lastName) => {
    accountPage.getGreetingElement()
        .should('contain',  `Hi, ${firstName} ${lastName}`)
})

Then(`The error message {string} should be visible`, errorMessage => {
    loginPage.getErrorMessage()
        .should('contain',  errorMessage)
})
