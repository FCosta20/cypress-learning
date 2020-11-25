class HomePage {

    navigateToLoginPage() {
        cy.get('.dropdown-login #dropdownCurrency').click()
        cy.contains('Login').click()
    }

    startChatWithUser(name, whatsUpNumber, email) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body).find('button[aria-label="Open LiveChat chat widget"]').click()
            cy.wrap($body).find('#name').clear().type(name)
            cy.wrap($body).find('.lc-1drigbt').contains('WhatsApp Number')
                .parent('div').find('input').clear().type(whatsUpNumber)
            cy.wrap($body).find('#email').clear().type(email)
            cy.wrap($body).find('.lc-1drigbt').contains('Are you existing client?')
                .parent('div').find('select').select("index0_0")
            cy.wrap($body).contains('Start the chat').click()
        })
    }

    showMoreInfoAboutUserInChat() {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            cy.wrap($body).find('.lc-6yodnr').last().contains('Show more').click()
        })
    }

    getUserCredInsideChatFrameByTitle(title) {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            return cy.wrap($body).contains(title).parent('div').next('div')
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
            cy.wrap($body).find('textarea[placeholder="Write a message…"]').type(message)
            cy.wrap($body).find('button[aria-label="Send a message"]').click()
        })
    }

    getLastSentMessageFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            return cy.wrap($body).find('.lc-142muc0.eovu8nx0').last().find('span')
        })
    }

    getLastSentMessageStatusFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            return cy.wrap($body).find('.lc-io2gce.e10ccb475').last()
        })
    }

}

export const homePage = new HomePage()
