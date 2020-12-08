class InvoicePage {

    getBookingStatus() {
        return cy.get('.content h4', {timeout: 10000})
    }

    payOnArrival() {
        cy.get('button')
            .contains('Pay on Arrival')
            .click()
        cy.on('window:confirm', () => true);
    }
}

export const invoicePage = new InvoicePage()
