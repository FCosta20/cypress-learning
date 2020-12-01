/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {loginPage} from "../support/pages/loginPage";
import {accountPage} from "../support/pages/accountPage";

describe('Login suite', () => {

    let user = {}

    before(() => {
        cy.fixture('user').then(localUser => {
            user = localUser;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    it('should be authorized', () => {
        homePage.navigateToLoginPage()
        loginPage.login(user.email, user.password)
        accountPage.getGreetingElement().should('contain',  `Hi, ${user.firstName} ${user.lastName}`)
    })

    it('should not be authorized with wrong password', () => {
        homePage.navigateToLoginPage()
        loginPage.login(user.email, user.wrongPassword)
        loginPage.getErrorMessage().should('contain',  'Invalid Email or Password')
    })

})
