import { get } from "cypress/types/jquery"
import { groupBy } from "cypress/types/lodash"

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
            getBody().find('select').select('No')
            getBody().find('button').contains('Start the chat').click()
            getBody().find('div').contains('Name:').should('contains', name)
        })
            
    }

}

export const chatBot = new ChatBot()