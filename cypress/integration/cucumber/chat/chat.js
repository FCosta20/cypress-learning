import {homePage} from "../../../support/pages/homePage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I start the chat with user info', () => {
    cy.fixture('user').then(user => {
        homePage.getChat()
            .startChatWithUser(user.firstName, user.phoneNumber, user.email)
    })
})

When('I show more info about user in the chat', () => {
    homePage.getChat()
        .showMoreInfoAboutUserInChat()
})

When('I send a message', () => {
    cy.fixture('testData').then(testData => {
        homePage.getChat()
            .sendMessageToChat(testData.message)
    })
})

Then('I should see user data in the chat', () => {
    homePage.getChat()
        .showMoreInfoAboutUserInChat()
    cy.fixture('user').then(user => {
        homePage.getChat()
            .getChatUserName()
            .should('contain', user.firstName)
        homePage.getChat()
            .getChatUserWhatsAppNumber()
            .should('contain', user.phoneNumber)
        homePage.getChat()
            .getChatUserEmail()
            .should('contain', user.email)
    })
})

Then('The last sent message should be visible', () => {
    cy.fixture('testData').then(testData => {
        homePage.getChat()
            .getLastSentMessageFromChat()
            .should('contain', testData.message)
        homePage.getChat()
            .getLastSentMessageStatusFromChat()
            .should('contain', 'Delivered')
    })
})

Then('I close the chat', () => {
    homePage.getChat()
        .closeTheChat(true)
})
