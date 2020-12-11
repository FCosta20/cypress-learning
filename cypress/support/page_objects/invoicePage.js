
class InvoicePage{

    openInvoicePage(){
    cy.url()
      .should('contain', 'invoice')
    }

    checkIfBookingIsUnpaid(){
      cy.get('.content')
      .contains('Your booking status is Unpaid')
      .should('be.visible')
    }
}

export const invoicePage = new InvoicePage()