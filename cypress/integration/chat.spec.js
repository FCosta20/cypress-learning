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

    // open the chat, fill user credentials, click 'Start the chat', chat is opened,
    // click show more to male visible all user data check that chat have valid user credentials,
    // type the message and send, check that message sent with label 'Delivered'
    it('should be sent a message to chat', () => {
        homePage.startChatWithUser(user.firstName, user.phoneNumber, user.email)

        homePage.showMoreInfoAboutUserInChat()

        homePage.getChatUserName()
            .should('contain', user.firstName)
        homePage.getChatUserWhatsAppNumber()
            .should('contain', user.phoneNumber)
        homePage.getChatUserEmail()
            .should('contain', user.email)

        homePage.sendMessageToChat(testData.message)

        homePage.getLastSentMessageFromChat()
            .should('contain', testData.message)
        homePage.getLastSentMessageStatusFromChat()
            .should('contain', 'Delivered')

        homePage.closeTheChat(true)
    })

})
