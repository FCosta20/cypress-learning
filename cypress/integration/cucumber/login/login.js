import{onHomePage} from "../../../support/page_objects/homePage.js"
import{onLoginPage} from "../../../support/page_objects/loginPage.js"
import{onAccountPage} from "../../../support/page_objects/accountPage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import {email, password, first_name, last_name} from "../../../fixtures/register.json"


Given('I am on home page', () => {
    cy.visit('/')
})

When('I navigate to login page', () => {
    onHomePage.goToLoginPage() 
})

And('I login with correct credentials', () => {
    onLoginPage.logIn(email, password)
})

Then('I should see greeting message', () => {
    onAccountPage.findMyName()
                    .should('be.visible')
                    .and('contain', `Hi, ${first_name} ${last_name}`)

})