import {homePage} from "../../../support/pages/homePage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I start the chat with user info', () => {
    cy.fixture('user').then(user => {
        homePage.startChatWithUser(user.firstName, user.phoneNumber, user.email)
    })
})

When('I show more info about user in the chat', () => {
    homePage.showMoreInfoAboutUserInChat()
})

When('I send a message', () => {
    cy.fixture('testData').then(testData => {
        homePage.sendMessageToChat(testData.message)
    })
})

Then('I should see user data in the chat', () => {
    homePage.showMoreInfoAboutUserInChat()
    cy.fixture('user').then(user => {
        homePage.getChatUserName()
            .should('contain', user.firstName)
        homePage.getChatUserWhatsAppNumber()
            .should('contain', user.phoneNumber)
        homePage.getChatUserEmail()
            .should('contain', user.email)
    })
})

Then('The last sent message should be visible', () => {
    cy.fixture('testData').then(testData => {
        homePage.getLastSentMessageFromChat()
            .should('contain', testData.message)
        homePage.getLastSentMessageStatusFromChat()
            .should('contain', 'Delivered')
    })
})

Then('I close the chat', () => {
    homePage.closeTheChat(true)
})
