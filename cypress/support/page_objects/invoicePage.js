
class InvoicePage{

    //open invoice page
    openInvoicePage(){
    cy.url()
      .should('contain', 'invoice')

    cy.get('.content')
      .contains('Your booking status is Unpaid')
      .should('be.visible')
    }
}

export const invoicePage = new InvoicePage()