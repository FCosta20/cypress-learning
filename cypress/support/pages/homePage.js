class HomePage {

    navigateToLoginPage() {
        cy.get('.dropdown-login #dropdownCurrency').click()
        cy.contains('Login').click()
    }

    navigateToRegistrationPage() {
        cy.get('.dropdown-login #dropdownCurrency').click()
        cy.contains('Sign Up').click()
    }

    startChatWithUser(name, whatsUpNumber, email) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // click the chat button to open
            cy.wrap($body).find('button[aria-label="Open LiveChat chat widget"]').click()
            // clear inputs and type name, whatsUpNumber and email
            cy.wrap($body).find('#name').clear().type(name)
            cy.wrap($body).find('.lc-1drigbt').contains('WhatsApp Number')
                .parent('div').find('input').clear().type(whatsUpNumber)
            cy.wrap($body).find('#email').clear().type(email)
            // select yes option
            cy.wrap($body).find('.lc-1drigbt').contains('Are you existing client?')
                .parent('div').find('select').select("index0_0")
            cy.wrap($body).contains('Start the chat').click()
        })
    }

    closeTheChat(isStarted) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // if user is log-in to the chat then click close button and confirm
            if (isStarted) {
                cy.wrap($body).find('button[aria-label="Close the chat"]').click()
                cy.wrap($body).find('span').contains('Close the chat').click()
            }
            // hide chat
            cy.wrap($body).find('button[aria-label="Minimize window"]').click()
        })
    }

    showMoreInfoAboutUserInChat() {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // click show more to display all info user entered
            cy.wrap($body).find('.lc-6yodnr').last().contains('Show more').click()
        })
    }

    // help method to get the user cred from chat by title
    getUserCredInsideChatFrameByTitle(title) {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            return cy.wrap($body).find('.lc-rv06pv.e1r9cm3y0').last().contains(title).parent('div').next('div')
        })
    }

    getChatUserName() {
        return this.getUserCredInsideChatFrameByTitle('Name')
    }

    getChatUserWhatsAppNumber() {
        return this.getUserCredInsideChatFrameByTitle('WhatsApp Number')
    }

    getChatUserEmail() {
        return this.getUserCredInsideChatFrameByTitle('E-mail')
    }

    sendMessageToChat(message) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // type message to input
            cy.wrap($body).find('textarea[placeholder="Write a message…"]').type(message)
            // send the message
            cy.wrap($body).find('button[aria-label="Send a message"]').click()
        })
    }

    getLastSentMessageFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // get last sent message from the chat
            return cy.wrap($body).find('.lc-142muc0.eovu8nx0').last().find('span')
        })
    }

    getLastSentMessageStatusFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // get status of sent message like Delivered, Read...
            return cy.wrap($body).find('.lc-io2gce.e10ccb475').last()
        })
    }

}

export const homePage = new HomePage()
