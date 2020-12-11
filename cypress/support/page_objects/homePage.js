
class HomePage{

  openAccountDropdown(){
      cy.contains('div', 'My Account')
        .click()
  }

    openLogInPage(){
        cy.contains('Login')
          .click()
    }

    openSignUpPage(){
        cy.contains('Sign Up')
          .click()
    }

    selectBusinessClass(){
      cy.get('div.form-icon-left.flightclass > div.chosen-container.chosen-container-single.chosen-container-single-nosearch')
        .click()
      cy.get('ul.chosen-results')
        .should('be.visible')
        .find('li[class^="active-result"]')
        .contains('Business')
        .click()
      
      cy.get('a.chosen-single')
        .should('contain', 'Business')
    }

    selectDay(futureDay, futureMonth, futureYear){
      cy.get('#FlightsDateStart')
        .click()

      cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
        .find('.datepicker--nav-title')
        .then(date => {
          if(!date.text().includes(futureMonth) || !date.text().includes(futureYear)){
            cy.get('div.datepicker.-bottom-left-.-from-bottom-.active > nav > div[data-action=next]')
              .click()
              this.selectDay(futureDay, futureMonth, futureYear)
              } else {
                  cy.get('div[class^="datepicker--cell datepicker--cell-day"][data-date]')
                    .contains(futureDay)
                    .click()
                  }
          })
        
      cy.get('#FlightsDateStart')
        .should('not.be.empty')
    }

    selectCurrentDay(){
      cy.get('#FlightsDateStart')
        .click()
    
      cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
        .should('be.visible')
        .find('div.datepicker--cell.datepicker--cell-day.-current-')
        .click()
    }

    selectAeroportFrom(){
        cy.get('#s2id_location_from')
          .type(aeroportFrom)
        cy.get('.select2-search > .select2-focused')
          .wait(1000)
          .type('{enter}')
    }

    selectAeroportTo(){
      cy.get('#s2id_location_to')
        .type(aeroportTo)
      cy.get('.select2-search > .select2-focused')
        .wait(1000)
        .type('{enter}')
    }

    selectCityFrom(cityFrom){
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
    }

    selectCityTo(cityTo){
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
    }

    openFlightForm(){
      cy.get('[data-name="flights"]')
        .click()
    }

    increasePassengers(){
      cy.get('input[name="fadults"] + span > button')
        .contains('+')
        .click()
    }

    startSearch(){
      cy.get('form[name="flightmanualSearch"]')
        .submit()
      cy.url().should('contain', 'flights/search')
    }
    
    
  }

export const homePage = new HomePage()