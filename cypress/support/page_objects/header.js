
class Header{

    //open home page
    openHomePage(){
        cy.get('[title="home"]')
          .click()
    }
}

export const header = new Header()