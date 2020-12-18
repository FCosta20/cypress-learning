
class HomePage{

  //open account dropdown
  openAccountDropdown(){
      cy.contains('div', 'My Account')
        .click()
  }

  //open login page
    openLogInPage(){
        cy.contains('Login')
          .click()
    }

    //open sign up page
    openSignUpPage(){
        cy.contains('Sign Up')
          .click()
    }

    //choose business class
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

    //choose custome day from flight fixture
    selectDay(futureDay, futureMonth, futureYear){
      cy.get('#FlightsDateStart')
        .click()

      cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
        .find('.datepicker--nav-title')
        .then(date => {
          if(!date.text().includes(futureMonth) || !date.text().includes(futureYear)){
            cy.get('div.datepicker.-bottom-left-.-from-bottom-.active div[data-action=next]')
              .click()
              this.selectDay(futureDay, futureMonth, futureYear)
              } else {
                  cy.get('div.datepicker.-bottom-left-.-from-bottom-.active div[class^="datepicker--cell datepicker--cell-day"]')
                    .contains(futureDay)
                    .click()
                  }
          })
    }

    //choose current date for booking flight
    selectCurrentDay(){
      cy.get('#FlightsDateStart')
        .click()
    
      cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
        .should('be.visible')
        .find('div.datepicker--cell.datepicker--cell-day.-current-')
        .click()
    }

    //select aeroport from
    selectAeroportFrom(){
        cy.get('#s2id_location_from')
          .type(aeroportFrom)
        cy.get('.select2-search > .select2-focused')
          .wait(1000)
          .type('{enter}')
    }

    //select aeroport to
    selectAeroportTo(){
      cy.get('#s2id_location_to')
        .type(aeroportTo)
      cy.get('.select2-search > .select2-focused')
        .wait(1000)
        .type('{enter}')
    }

    //select city from
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

    //select city to
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

    //open flight form for fill booking info
    openFlightForm(){
      cy.get('[data-name="flights"]')
        .click()
    }

    //increase passenger info
    increasePassengers(){
      cy.get('input[name="fadults"] + span > button')
        .contains('+')
        .click()
    }

    //start searching for flight
    startSearch(){
      cy.get('form[name="flightmanualSearch"]')
        .submit()
      cy.url().should('contain', 'flights/search')
    }
    
    
  }

export const homePage = new HomePage()