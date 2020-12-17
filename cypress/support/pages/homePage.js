class HomePage {

    navigateToLoginPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Login')
            .click()
    }

    navigateToRegistrationPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Sign Up')
            .click()
    }

    openFlightForm() {
        cy.get('a')
            .contains('Flights')
            .click()
    }

    selectBusinessClass() {
        cy.get('.flightclass .chosen-single')
            .click()
        cy.get('.chosen-results li')
            .contains('Business')
            .click()
    }

    selectFlightCities(cityFrom, cityTo) {
        // open city from input
        cy.get('#s2id_location_from')
            .click()
        // type city from
        cy.get('#select2-drop .select2-input')
            .type(cityFrom)
        // click first cityFrom from dropdown list
        cy.get('#select2-drop .select2-results li.select2-results-dept-0')
            .first()
            .click()

        cy.get('#s2id_location_to')
            .click()
        cy.get('#select2-drop .select2-input')
            .type(cityTo)
        cy.get('#select2-drop .select2-results li.select2-results-dept-0')
            .first()
            .click()
    }

    selectFlightDayOrNextMonth(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let flightMonth = months[date.getMonth()];

        cy.get('#datepickers-container div[style] .datepicker--nav-title').then(title => {
            // if title does not include necessary month and year click next month
            // and call this method again else choose the day
            if (!title.text().includes(date.getFullYear()) || !title.text().includes(flightMonth)) {
                cy.get('#datepickers-container div[style] .datepicker--nav-action[data-action="next"]')
                    .click()
                this.selectFlightDayOrNextMonth(date)
            } else {
                const daySelector = "#datepickers-container div[style] [data-date=" + date.getDate() + "][data-month=" + date.getMonth() + "]"
                cy.get(daySelector)
                    .click()
            }
        })
    }

    selectFlightDay(date) {
        cy.get('#FlightsDateStart')
            .click()
        this.selectFlightDayOrNextMonth(date)
    }


    addAdultToFlight() {
        cy.get('#flights label')
            .contains("Adults")
            .parent("div")
            .find('.bootstrap-touchspin-up')
            .click()
    }

    searchTheFlight() {
        cy.get('#flights button')
            .contains("Search")
            .click()
    }


    startChatWithUser(name, whatsUpNumber, email) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // click the chat button to open
            cy.wrap($body).find('button[aria-label="Open LiveChat chat widget"]')
                .click()
            // clear inputs and type name, whatsUpNumber and email
            cy.wrap($body).find('#name')
                .clear()
                .type(name)
            cy.wrap($body).find('form')
                .contains('WhatsApp Number')
                .parent('div')
                .find('input')
                .clear()
                .type(whatsUpNumber)
            cy.wrap($body)
                .find('#email')
                .clear()
                .type(email)
            // select yes option
            cy.wrap($body).find('form')
                .contains('Are you existing client?')
                .parent('div')
                .find('select')
                .select("index0_0")
            cy.wrap($body).contains('Start the chat')
                .click()
        })
    }

    closeTheChat(isStarted) {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // if user is log-in to the chat then click close button and confirm
            if (isStarted) {
                cy.wrap($body).find('button[aria-label="Close the chat"]')
                    .click()
                cy.wrap($body).find('span').contains('Close the chat')
                    .click()
            }
            // hide chat
            cy.wrap($body).find('button[aria-label="Minimize window"]')
                .click()
        })
    }

    showMoreInfoAboutUserInChat() {
        cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // click show more to display all info user entered
            cy.wrap($body).find('.lc-6yodnr')
                .last()
                .contains('Show more')
                .click()
        })
    }

    // help method to get the user cred from chat by title
    getUserCredInsideChatFrameByTitle(title) {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            return cy.wrap($body).find('.lc-rv06pv.e1r9cm3y0')
                .last()
                .contains(title)
                .parent('div')
                .next('div')
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
            cy.wrap($body)
                .find('textarea[placeholder="Write a message…"]')
                .type(message)
            // send the message
            cy.wrap($body)
                .find('button[aria-label="Send a message"]')
                .click()
        })
    }

    getLastSentMessageFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // get last sent message from the chat
            return cy.wrap($body)
                .find('.lc-142muc0.eovu8nx0')
                .last()
                .find('span')
        })
    }

    getLastSentMessageStatusFromChat() {
        return cy.get('#chat-widget-container iframe').then($iframe => {
            const $body = $iframe.contents().find('body')
            // get status of sent message like Delivered, Read...
            return cy.wrap($body)
                .find('.e10ccb475')
                .last()
        })
    }

}

export const homePage = new HomePage()
