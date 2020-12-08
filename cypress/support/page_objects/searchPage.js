
class SearchPage{

    //select flight and book it
    bookFirstFlightResult(){
        cy.get('#LIST')
          .find('form')
          .first()
          .submit()
        
        cy.url().should('contain', 'flights/book')
    }

}

export const searchPage = new SearchPage()