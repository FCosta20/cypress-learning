
class Header{

    //open home page
    openHomePage(){
        cy.get('[title="home"]')
          .click()
        
        cy.url()
          .should('eq', 'https://www.phptravels.net/home')
    }
}

export const header = new Header()