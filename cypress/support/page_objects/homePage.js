
class HomePage{

    goToLoginPage() {
        cy.get('ul>li').eq(2).click()
        cy.get('.dropdown-menu').parent('div').find('.active').click()
    }

    
}

class ChatBot{

    openChatBot(){
        cy.frameLoaded('#chat-widget', { url: '/secure.livechatinc.com' })
        cy.wait(1000)
    }

    startChatBot(first_name, mobile_phone, email) {
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Open LiveChat chat widget"]').should('be.visible').click()
            getBody().find('#name').type(first_name)
            getBody().contains('WhatsApp Number').should('be.visible').type(mobile_phone)
            getBody().find('#email').type(email)
            getBody().find('select').select('No')
            getBody().find('button').contains('Start the chat').click()
            getBody().find('div').should('contains.text', first_name)
        })
    }

    typeMessageInChat(message) {
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('textarea[placeholder="Write a message…"]').type(message)
            getBody().find('button[aria-label="Send a message"]').click()
        })
    }
}

export const onHomePage = new HomePage()

export const inChatBot = new ChatBot()