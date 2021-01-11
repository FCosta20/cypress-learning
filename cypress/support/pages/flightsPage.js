class FlightsPage {

    bookFirstFlight() {
        cy.get('#LIST button')
            .contains('Book Now')
            .click()
    }

    checkAirline(index) {
        cy.get('form[name="fFilters"] #myBtn input')
            .eq(index)
            .check({force:true})

        return cy.get('form[name="fFilters"] #myBtn span')
            .eq(index)
            .then(airlineTextElem => {
                return airlineTextElem.text().trim()
            })
    }

    getAirlineListNames() {
        return cy.get('#LIST form h5')
    }

}

export const flightsPage = new FlightsPage()
