
class InvoicePage{

    checkIfBookingIsUnpaid(){
      cy.get('.content')
      .contains('Your booking status is Unpaid')
      .should('be.visible')
    }
}

export const onInvoicePage = new InvoicePage()