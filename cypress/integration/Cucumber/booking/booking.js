import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

//variable for giving data from personalInfo fixture
let user = {}

//variable for giving data from guestInfo fixture
let guest = {}

//variable for giving data from bookFlight fixture
let flight = {}

//take data from personalInfo, bookFlight and guestInfo fixtures
before(() => {
    cy.fixture(('personalInfo')).then( personalInfo => {
        user = personalInfo;
    })
    cy.fixture(('bookFlight')).then( bookFlight => {
        flight = bookFlight;
    })
    cy.fixture(('guestInfo')).then(guestInfo => {
        guest = guestInfo;
    })
})

function selectDay(futureDay, futureMonth, futureYear){
  cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
      .find('.datepicker--nav-title')
      .then(date => {
        if(!date.text().includes(futureMonth) || !date.text().includes(futureYear)){
          cy.get('div.datepicker.-bottom-left-.-from-bottom-.active > nav > div[data-action=next]')
            .click()
            selectDay(futureDay, futureMonth, futureYear)
            } else {
                cy.get('div[class^="datepicker--cell datepicker--cell-day"][data-date]')
                  .contains(futureDay)
                  .click()
                }
        })
}

Given('I visit PHPTravelers site', () => {
  cy.visit('https://www.phptravels.net/home')
})

When('I open account dropdown', () => {
  cy.contains('div', 'My Account')
    .click()
})

Then('I open login page', () => {
  cy.contains('Login')
      .click()
})

When('I open home page', () => {
  cy.get('[title="home"]')
    .click()
        
  cy.url()
    .should('eq', 'https://www.phptravels.net/home')
})

And('I select business class', () => {
  cy.get('div.form-icon-left.flightclass > div.chosen-container.chosen-container-single.chosen-container-single-nosearch')
    .click()
  cy.get('ul.chosen-results')
    .should('be.visible')
    .find('li[class^="active-result"]')
    .contains('Business')
    .click()
  
  cy.get('a.chosen-single')
    .should('contain', 'Business')
})

And('I select custom date', () => {
    cy.get('#FlightsDateStart')
      .click()

    selectDay(flight.futureDay, flight.futureMonth, flight.futureYear )
      
    cy.get('#FlightsDateStart')
      .should('not.be.empty')
})

Given('I select current date', () => {
  cy.get('#FlightsDateStart')
    .click()

  cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
    .should('be.visible')
    .find('div.datepicker--cell.datepicker--cell-day.-current-')
    .click()
})

When('I enter aeroport from and aeroport to', () => {
  cy.get('#s2id_location_from')
      .type(flight.aeroportFrom)
    cy.get('.select2-search > .select2-focused')
      .wait(1000)
      .type('{enter}')
      
  cy.get('#s2id_location_to')
    .type(flight.aeroportTo)
  cy.get('.select2-search > .select2-focused')
    .wait(1000)
    .type('{enter}')
})

When('I enter city from and city to', () => {
  cy.get('#s2id_location_from')
      .type(flight.cityFrom)
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
      .type(flight.cityTo)
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
})

Then('I open flight form', () => {
  cy.get('[data-name="flights"]')
    .click()
})

And('I increase passangers quantity', () => {
  cy.get('input[name="fadults"] + span > button')
    .contains('+')
    .click()
})

Then('I start search', () => {
  cy.get('form[name="flightmanualSearch"]')
    .submit()
  cy.url()
    .should('contain', 'flights/search')
})

Given('I open home page', () => {
  cy.get('[title="home"]')
      .click()
    
  cy.url()
    .should('eq', 'https://www.phptravels.net/home')
})

When('I select first flight result', () => {
  cy.get('#LIST')
    .find('form')
    .first()
    .submit()
        
  cy.url().should('contain', 'flights/book')
})

When('I open invoice page', () => {
  cy.url()
    .should('contain', 'invoice')
})

Then('I check if booking is unpaid', () => {
  cy.get('.content')
    .contains('Your booking status is Unpaid')
    .should('be.visible')
})

When('I fill in login form', () => {
  cy.contains('Email')
    .type(user.email)
  cy.contains('Password')
    .type(user.password)
})

Then('I login', () => {
  cy.contains('button', 'Login')
    .click()
  cy.url()
    .should('contain', 'account')
})

Then('I fill in passanger form', () => {
  cy.get('#passenger_name_0')
    .click({force:true})
    .type(user.name)
  cy.get('#passenger_age_0')
    .click({force:true})
    .type(user.age)
  cy.get('#passenger_passport_0')
    .click({force:true})
    .type(user.passportNo) 
})

Given('I fill in guest form', () => {
  cy.get('input[name="firstname"]')
        .click({force:true})
        .type(guest.firstName)
      cy.get('input[name="lastname"]')
        .click({force:true})
        .type(guest.lastName)
      cy.get('input[name="email"]')
        .click({force:true})
        .type(guest.email)
      cy.get('input[name="confirmemail"]')
        .click({force:true})
        .type(guest.email)
      cy.get('input[name="phone"]')
        .click({force:true})
        .type(guest.phone)
      cy.get('input[name="address"]')
        .click({force:true})
        .type(guest.address)
      cy.get('div.chosen-container.chosen-container-single')
        .click()
        .should('have.attr', 'class', 'chosen-container chosen-container-single chosen-with-drop chosen-container-active')
      cy.get('div.chosen-search')
        .type(guest.address)
        .then(list => {
          if(list.children().eq(guest.address)){
            cy.get('li.active-result')
              .click()
          }
        })
})

And('I complete booking', () => {
  cy.get('button.btn.btn-success.btn-lg.btn-block.completebook')
    .click()
})

