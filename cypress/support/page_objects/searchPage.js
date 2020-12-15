
class SearchPage{

    selectFirstFlightResult(){
        cy.get('#LIST')
          .find('form')
          .first()
          .submit()
        
        cy.url().should('contain', 'flights/book')
    }

}

export const searchPage = new SearchPage()