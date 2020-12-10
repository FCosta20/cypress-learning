
class HomePage{

    goToLoginPage() {
        cy.get('ul>li')
            .eq(2)
            .click()
        cy.get('.dropdown-menu')
            .parent('div')
            .find('.active')
            .click()
    }

    goToBookingFlight() {
        cy.get('.menu-horizontal-wrapper-02')
            .find('[data-name = "flights"]')
            .parent('li')   
            .click()
            .then( ()=> {
                cy.get('[data-name = "flights"]')
                .should('have.class','active')
        })
    }

    bookFlight(flightFrom, flightTo ) {
        cy.get('.tab-inner')
            .parent('#flights') 
            .find('#s2id_location_from')
            .click()
            .get('#select2-drop ')  
                .find('.select2-input') 
                .parent('.select2-search')
            .type(flightFrom)
                cy.get('.select2-results')
                    .then( ()=> {
                        cy.get('li.select2-results-dept-0')
                            .first()
                            .click()
                    })
        cy.get('.tab-inner')
            .parent('#flights') 
            .find('#s2id_location_to')
            .dblclick()
            .get('#select2-drop ')
                .find('.select2-input')
                .parent('.select2-search')
            .type(flightTo)
                cy.get('.select2-results')
                    .then( ()=> {
                        cy.get('li.select2-results-dept-0')
                        .first()
                        .click()
                })              
    }

    getDatePicker() {
        cy.get('#FlightsDateStart')
            .click()
    }

    selectFlightDay(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let flightMonth = months[date.getMonth()];

        cy.get('#datepickers-container div[style] .datepicker--nav-title').then(title => {
            // if title does not include necessary month and year click next month
            // and call this method again.
            // else condition will work then mounth of flight is a current mounth and  its just choose the day
            if (!title.text().includes(date.getFullYear()) || !title.text().includes(flightMonth)) {
                cy.get('#datepickers-container div[style] .datepicker--nav-action[data-action="next"]')
                    .click()
                this.selectFlightDay(date)
            } else {
                const daySelector = "#datepickers-container div[style] [data-date=" + date.getDate() + "][data-month=" + date.getMonth() + "]"
                cy.get(daySelector)
                    .click()
            }
        })
    }
    
}

class ChatBot{

    openChatBot(){
        cy.frameLoaded('#chat-widget', { url: '/secure.livechatinc.com' })
        cy.wait(1000)

    }

    startChatBot(first_name, mobile_phone, email) {
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Open LiveChat chat widget"]')
                        .should('be.visible')   
                        .click()
            getBody().find('#name')
                        .clear()
                        .type(first_name)
            getBody().find('span')  
                        .parent('label')
                        .contains('WhatsApp Number')
                        .should('be.visible')
            getBody().find('[autocomplete = "off"]')
                        .parent('div')
                        .type(mobile_phone)
            getBody().find('#email')
                        .clear()
                        .type(email)
            getBody().find('select')
                        .select('No')
            getBody().find('button')
                        .contains('Start the chat')
                        .should('be.visible')
                        .click()
            getBody().find('div')
                        .should('contains.text', first_name)
        })
    }

    closeChatBot() {
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('[aria-label="Close the chat"]')
                        .click()
            getBody().find('button')
                        .contains('Close the chat')
                        .click()
            getBody().find('[aria-label="Minimize window"]')
                        .click()
            getBody().find('[aria-label="Open LiveChat chat widget"]')
                        .should('be.visible')

        })
    }

    typeMessageInChat(message) {
        cy.enter('#chat-widget').then(getBody => {
            getBody().find('textarea[placeholder="Write a message…"]')
                        .type(message)
            getBody().find('button[aria-label="Send a message"]')
                        .click()
        })
    }
}

export const onHomePage = new HomePage()

export const inChatBot = new ChatBot()