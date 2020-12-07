class FlightsPage {

    bookFirstFlight() {
        cy.get('#LIST button').contains('Book Now').click()
    }

}

export const flightsPage = new FlightsPage()
