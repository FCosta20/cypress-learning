import {homePage} from "../../../support/pages/homePage";
import {accountPage} from "../../../support/pages/accountPage";
import {loginPage} from "../../../support/pages/loginPage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I navigate to login page', () => {
    homePage.navigateToLoginPage()
})

When('I login with correct credentials', () => {
    cy.fixture('user').then(user => {
        loginPage.login(user.email, user.password)
    })
})

When('I login with wrong password', () => {
    cy.fixture('user').then(user => {
        loginPage.login(user.email, user.wrongPassword)
    })
})

When('I login as following', dataTable => {
    dataTable.hashes().forEach(row => {
        loginPage.clearInputs()
        loginPage.login(row.email, row.password)
    })
})

Then('I should see greeting message', () => {
    cy.fixture('user').then(user => {
        accountPage.getGreetingElement()
            .should('contain', `Hi, ${user.firstName} ${user.lastName}`)
    })
})

Then(`I should see an error message`, () => {
    loginPage.getErrorMessage()
        .should('contain',  'Invalid Email or Password')
})

