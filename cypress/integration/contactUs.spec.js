/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {contactUsPage} from "../support/pages/contactUsPage";

describe('Contact us suite', () => {

    let user = {}
    let testData = {}

    before(() => {
        cy.fixture('user').then(localUser => {
            user = localUser;
        });
        cy.fixture('testData').then(localTestData => {
            testData = localTestData;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    it('user can not contact us without verifying captcha', () => {

        homePage.getFooter()
            .navigateToContactUsPage()

        contactUsPage.fillData(user.firstName, user.email, testData.contactSubject, testData.contactMessage)

        contactUsPage.getCaptchaForm().should('be.visible')

        //contactUsPage.getSuccessMessage().should('contain', 'Message Sent Successfully')
    })

})
