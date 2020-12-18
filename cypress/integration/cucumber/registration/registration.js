import{onHomePage} from "../../../support/page_objects/homePage.js"
import{onRegisterPage} from "../../../support/page_objects/registerPage.js"
import{onAccountPage} from "../../../support/page_objects/accountPage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import {first_name, last_name,
        mobile_phone, email, password} from "../../../fixtures/register.json"

Given('I am on home page', () => {
    cy.visit('/')
})

When('I navigate to sign up page', () => {
    onHomePage.goToLoginPage() 
    cy.get('.btn').parents('.zoomInDown')
                    .contains('Sign Up')
                    .click()
})

And('I register user with personal data', () => {
    onRegisterPage.signUpPage(first_name, last_name,
                              mobile_phone, email,
                              password)
})

Then('I should see greeting message', () => {
    onAccountPage.findMyName()
                 .should('be.visible')
                 .and('contain', `Hi, ${first_name} ${last_name}`)

})
