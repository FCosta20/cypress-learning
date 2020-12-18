class FlightListPage {

    bookFirstFlight(){
        cy.get('#LIST')
          .find('form')
          .first()
          .submit()
        cy.url().should('contain', 'flights/book')
    }
}

export const onFlightListPage = new FlightListPage()