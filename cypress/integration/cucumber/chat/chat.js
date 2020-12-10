import {homePage} from "../../../support/pages/homePage";


Given('I visit home page', () => {
    cy.openHomePage()
})

When(`I click to chat icon, fill user info with {string}, {string}, {string}, select that I am existing user and click start the chat`,
    (name, email, whatsUpNumber) => {
    homePage.startChatWithUser(name, email, whatsUpNumber)
})

When('I show more info about user in the chat', () => {
    homePage.showMoreInfoAboutUserInChat()
})

When(`I put {string} to message field and click send message icon`, message => {
    homePage.sendMessageToChat(message)
})

Then(`The user name, whats up number and email should contain {string}, {string} and {string}`, (name, whatsUpNumber, email) => {
    homePage.getChatUserName()
        .should('contain', name)
    homePage.getChatUserWhatsAppNumber()
        .should('contain', whatsUpNumber)
    homePage.getChatUserEmail()
        .should('contain', email)
})

Then(`The last sent message should be {string} with label {string}`, (message, messageStatus) => {
    homePage.getLastSentMessageFromChat()
        .should('contain', message)
    homePage.getLastSentMessageStatusFromChat()
        .should('contain', messageStatus)
})

Then('I close the chat', () => {
    homePage.closeTheChat(true)
})
