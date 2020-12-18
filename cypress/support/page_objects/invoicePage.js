
class InvoicePage{

  //check if invoice page is opened
    openInvoicePage(){
    cy.url()
      .should('contain', 'invoice')
    }

    //check if booking is unpaid
    checkIfBookingIsUnpaid(){
      cy.get('.content')
      .contains('Your booking status is Unpaid')
      .should('be.visible')
    }
}

export const invoicePage = new InvoicePage()