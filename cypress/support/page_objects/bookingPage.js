class BookingPage {

    signIn(email, password) {
        cy.get('#signintab').click().then( ()=>{
            cy.get('.tab-content').then( ()=>{
                cy.get('span')
                    .siblings('input[type = "email"]')
                    .parents('.col-md-12')
                    .type(email)
                cy.get('span')
                    .siblings('input[type = "password"]')
                    .parents('.col-md-12')
                    .type(password)
            })  
        })
    }

    fillInPassengersData(name, age, passport_number) {
        cy.get('#passenger_name_0')
            .siblings('span')
            .type(name)
        cy.get('#passenger_age_0')
            .siblings('span')
            .type(age)
        cy.get('#passenger_passport_0')
            .siblings('span')
            .type(passport_number)
    }

    confirmTheBooking() {
        cy.get('button')
            .contains('CONFIRM THIS BOOKING')
            .click()
    }

}

export const onBookingPage = new BookingPage()