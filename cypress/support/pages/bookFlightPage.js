class BookFlightPage {

    fillPassengerData(name, age, passportNumber) {
        cy.get('#passenger_name_0').type(name, {force: true})
        cy.get('#passenger_age_0').type(age, {force: true})
        cy.get('#passenger_passport_0').type(passportNumber, {force: true})
    }

    confirmTheBooking() {
        cy.get('button').contains('CONFIRM THIS BOOKING').click()
    }
}

export const bookFlightPage = new BookFlightPage()
