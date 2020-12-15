import{onHomePage} from "../support/page_objects/homePage.js"
import{onLoginPage} from "../support/page_objects/loginPage.js"
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

When('I navigate to login page', () => {
    onHomePage.goToLoginPage() 
})

And('I login with correct credentials', () => {
    onLoginPage.logIn(user.email, user.password)
})

Then('I should see greeting message', () => {
    onAccountPage.findMyName()
                    .should('be.visible')
                    .and('contain', `Hi, ${user.first_name} ${user.last_name}`)

})