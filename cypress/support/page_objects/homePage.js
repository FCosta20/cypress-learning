
function selectCurrentDay(){
  cy.get('#FlightsDateStart')
    .click()

  cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
    .should('be.visible')
    .find('div.datepicker--cell.datepicker--cell-day.-current-')
    .click()

          // cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
      //   .invoke('attr', 'data-date')
      //   .then(dateAttribute => {
      //     if(dateAttribute.includes(currentDay)){
      //       cy.get('div.datepicker--cells.datepicker--cells-days div[data-date]')
      //         .contains(dateAttribute)
      //         .click()
      //     }
      //   })
}

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

    //search flight by aeroport name
    searchFlightByAeroport(aeroportFrom, aeroportTo){
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

      selectCurrentDay()

      cy.get('.input-group-btn-vertical')
        .children()
        .contains('+')
        .click

      cy.get('form[name="flightmanualSearch"]')
        .submit()
        
      cy.url().should('contain', 'flights/search')
          
    }

    //select flight by city name
    selectFlightBuCity(cityFrom, cityTo){
      cy.get('[data-name="flights"]')
        .click()

      cy.get('#s2id_location_from')
          .type(cityFrom)
        cy.get('.select2-results')
          .then(list => {
            if(list.length > 1){
              cy.get('li.select2-results-dept-0')
                .last()
                .click()
            } else {
              cy.get('li.select2-results-dept-0')
                .first()
                .click()
            }
          })

      cy.get('#s2id_location_to')
        .type(cityTo)
      cy.get('.select2-results')
        .then(list => {
          if(list.length > 1){
            cy.get('li.select2-results-dept-0')
              .last()
              .click()
          } else {
            cy.get('li.select2-results-dept-0')
              .first()
              .click()
          }
        })
      
      selectCurrentDay()

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