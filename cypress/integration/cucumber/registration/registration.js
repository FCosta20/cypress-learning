import{onHomePage} from "../support/page_objects/homePage.js"
import{onRegisterPage} from "../support/page_objects/registerPage.js"
import{onAccountPage} from "../support/page_objects/accountPage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

let user = {}
before(() => {
    cy.fixture('register').then(register=> {
        user = register;
      });
  });


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
    onRegisterPage.signUpPage(user.first_name,user.last_name,
                              user.mobile_phone,user.email,
                              user.password)
})

Then('I should see greeting message', () => {
    onAccountPage.findMyName()
                 .should('be.visible')
                 .and('contain', `Hi, ${user.first_name} ${user.last_name}`)

})
