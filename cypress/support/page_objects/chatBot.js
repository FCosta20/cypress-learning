//import { get } from "cypress/types/jquery"
//import { groupBy } from "cypress/types/lodash"

class ChatBot{

    //loading iframe
    loadChatBot(){
        cy.frameLoaded('#chat-widget', { url: '/secure.livechatinc.com' })
    }

    //fill alle the fields in chatBot conversation
    startChatWithBot(name, phone, email){
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Open LiveChat chat widget"]').should('be.visible').click()
            getBody().find('#name').clear().type(name)
            getBody().contains('WhatsApp Number:').type(phone)
            getBody().find('#email').type(email)
            getBody().find('select').select('No')
            getBody().find('button').contains('Start the chat').click()
            getBody().find('div').contains('Name:').should('contains', name)
        })
            
    }

    //close chatBot
    closeChatBot(){
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Close the chat"]').click()
            getBody().find('[type="submit"]').contains('Close the chat').click()
            getBody().find('fieldset').contains('Was the case resolved during the chat?').then(input => {
                getBody().find(input.text('No')).click()
            })
        })
    }

}

export const chatBot = new ChatBot()