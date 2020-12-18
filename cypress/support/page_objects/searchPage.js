
class SearchPage{

  //select firts flight in flight results
    selectFirstFlightResult(){
        cy.get('#LIST')
          .find('form')
          .first()
          .submit()
        
        cy.url().should('contain', 'flights/book')
    }

}

export const searchPage = new SearchPage()