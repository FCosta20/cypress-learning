
class HomePage{

    //open login page
    openLogInPage(){
        cy.contains('div', 'My Account')
          .click()
        cy.contains('Login')
          .click()
    }

    //open sign up page
    openSignUpPage(){
        cy.contains('div', 'My Account')
          .click()
        cy.contains('Sign Up')
          .click()
    }

    //search for flight
    searchFlight(aeroportFrom, aeroportTo){
      cy.get('[data-name="flights"]')
        .click()

      cy.get('#s2id_location_from')
        .type(aeroportFrom)
      cy.get('.select2-search > .select2-focused')
        .wait(1000)
        .type('{enter}')

      cy.get('#s2id_location_to')
        .type(aeroportTo)
      cy.get('.select2-search > .select2-focused')
        .wait(1000)
        .type('{enter}')

      cy.get('#FlightsDateStart')
        .click()

      cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
        .should('be.visible')
        .find('div.datepicker--cell.datepicker--cell-day.-current-')
        .click()

      cy.get('.input-group-btn-vertical')
        .children()
        .contains('+')
        .click

      cy.get('form[name="flightmanualSearch"]')
        .submit()
        
      cy.url().should('contain', 'flights/search')
          
    }
}

export const homePage = new HomePage()