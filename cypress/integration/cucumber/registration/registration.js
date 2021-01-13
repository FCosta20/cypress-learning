import {homePage} from "../../../support/pages/homePage";
import {registrationPage} from "../../../support/pages/registrationPage";
import {accountPage} from "../../../support/pages/accountPage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I navigate to sign up page', () => {
    homePage.getHeader()
        .navigateToRegistrationPage()
})

When('I register user with user data', () => {
    cy.fixture('user').then(user => {
        registrationPage.register(user.firstName, user.lastName, user.phoneNumber, user.email, user.password, user.password)
    })
})

When('I register user with different passwords', () => {
    cy.fixture('user').then(user => {
        registrationPage.register(user.firstName, user.lastName, user.phoneNumber, user.email, user.password, user.wrongPassword)
    })})

Then('I should see greeting message', () => {
    cy.fixture('user').then(user => {
        accountPage.getGreetingElement()
            .should('contain', `Hi, ${user.firstName} ${user.lastName}`)
    })
})

Then(`I should see an error message`, () => {
    registrationPage.getErrorMessage()
        .should('contain',  'Password not matching with confirm password')
})
