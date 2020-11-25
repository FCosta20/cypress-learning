/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";

describe('Chat suite', () => {

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

    it('should be sent a message to chat', () => {
        homePage.startChatWithUser(user.firstName, user.whatsUpNumber, user.email)
        homePage.showMoreInfoAboutUserInChat()
        homePage.getChatUserName().should('contain', user.firstName)
        homePage.getChatUserWhatsAppNumber().should('contain', user.whatsUpNumber)
        homePage.getChatUserEmail().should('contain', user.email)
        homePage.sendMessageToChat('Hi, bot')
        homePage.getLastSentMessageFromChat().should('contain', 'Hi, bot')
        homePage.getLastSentMessageStatusFromChat().should('contain', 'Delivered')
    })

})
