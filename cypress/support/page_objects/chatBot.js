
class ChatBot{

    loadChatBot(){
        cy.frameLoaded('#chat-widget', { url: '/secure.livechatinc.com' })
    }

    startChatWithBot(name, phone, email){
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Open LiveChat chat widget"]').should('be.visible').click()
            getBody().find('#name').type(name)
            getBody().contains('WhatsApp Number').should('be.visible').type(phone)
            getBody().find('#email').type(email)
            getBody().contains('Are you existing client?').click()
            getBody().find('select').click()
            getBody().find('option').contains('No').click()
            getBody().find('button').contains('Start the chat').click()
        })
            
    }

}

export const chatBot = new ChatBot()