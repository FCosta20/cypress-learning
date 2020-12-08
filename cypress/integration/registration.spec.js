/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {registrationPage} from "../support/pages/registrationPage";
import {accountPage} from "../support/pages/accountPage";

describe('Registration suite', () => {

    let user = {}

    before(() => {
        cy.fixture('user').then(localUser => {
            user = localUser;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    // fill all inputs with user data click 'Sign Up' and check that element with greeting text contains username
    it('should be registered', () => {
        homePage.navigateToRegistrationPage()

        registrationPage.register(user.firstName, user.lastName, user.phoneNumber, user.email, user.password, user.password)

        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)
    })

    // fill all inputs with user data but with different passwords click 'Sign Up' and
    // check that error message contain 'Password not matching with confirm password'
    it('should not be registered with different passwords', () => {
        homePage.navigateToRegistrationPage()

        registrationPage.register(user.firstName, user.lastName, user.phoneNumber, user.email, user.password, user.wrongPassword)

        registrationPage.getErrorMessage()
            .should('contain',  'Password not matching with confirm password')
    })

})
