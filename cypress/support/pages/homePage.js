import {footer} from "../components/footer";
import {header} from "../components/header";
import {chat} from "../components/chat";

class HomePage {

    getHeader() {
        return header
    }

    getChat() {
        return chat
    }

    getFooter() {
        return footer
    }

    chooseFirstHotel() {
        cy.contains('h2', 'Featured Hotels')
            .parents('.section-title')
            .next('#MenuHorizon28_01')
            .find('a')
            .first()
            .click()
    }

    getFirstHotelPrice() {
        return cy.contains('h2', 'Featured Hotels')
            .parents('.section-title')
            .next('#MenuHorizon28_01')
            .find('.price .text-secondary')
            .first()
            .then(priceElem => {
                return priceElem.text().trim()
            })
    }

    getFirstFrightPrice() {
        return cy.contains('h2', 'Featured Flights')
            .parents('.section-title')
            .next('div')
            .find('figcaption .d-block')
            .first()
            .then(priceElem => {
                return priceElem.text().trim()
            })
    }

    getFirstTourPrice() {
        return cy.contains('h2', 'Featured Tours')
            .parents('.section-title')
            .next('div')
            .find('figcaption .text-secondary')
            .first()
            .then(priceElem => {
                return priceElem.text().trim()
            })
    }

    getFirstRentalPrice() {
        return cy.contains('h2', 'Featured Rentals')
            .parents('.section-title')
            .next('div')
            .find('figcaption .text-secondary')
            .first()
            .then(priceElem => {
                return priceElem.text().trim()
            })
    }

    getFirstBoatPrice() {
        return cy.contains('h2', 'Featured Boats')
            .parents('.section-title')
            .next('div')
            .find('figcaption .text-secondary')
            .first()
            .then(priceElem => {
                return priceElem.text().trim()
            })
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

}

export const homePage = new HomePage()
