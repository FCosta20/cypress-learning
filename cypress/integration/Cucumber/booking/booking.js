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

//open site
Given('I visit PHPTravelers site', () => {
    cy.visit('http://www.phptravels.net/home')
})

//fill log in form and login
Given('I log in', () => {
    cy.contains('div', 'My Account')
      .click()
    cy.contains('Login')
      .click()
    cy.contains('Email')
      .type(user.email)
    cy.contains('Password')
      .type(user.password)
    cy.contains('button', 'Login')
      .click()
      cy.get('.text-align-left').then(label => {
        expect(label.text()).to.equal('Hi, ' + user.firstName + ' ' + user.lastName)
    })
})

//open home page, flight search form
Given('I open flight search form', () => {
    cy.get('[title="home"]')
      .click()
    cy.url()
      .should('eq', 'https://www.phptravels.net/home')

    cy.get('[data-name="flights"]')
      .click()
})

//fill flight form and start searching
Given('I search for flight', () => {
    cy.get('div.form-icon-left.flightclass > div.chosen-container.chosen-container-single.chosen-container-single-nosearch')
      .click()
    cy.get('ul.chosen-results')
      .should('be.visible')
      .find('li[class^="active-result"]')
      .contains('Business')
      .click()
    
    cy.get('a.chosen-single')
      .should('contain', 'Business')

    cy.get('#FlightsDateStart')
      .click()
    cy.get('div.datepicker.-bottom-left-.-from-bottom-.active')
      .should('be.visible')
      .find('div.datepicker--cell.datepicker--cell-day.-current-')
      .click()
    
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
    
    cy.get('input[name="fadults"] + span > button')
      .contains('+')
      .click()
    
    cy.get('form[name="flightmanualSearch"]')
      .submit()
    cy.url().should('contain', 'flights/search')
    
})

//book first flight
Given('I select first flight', () => {
    cy.get('#LIST')
      .find('form')
      .first()
      .submit()
        
    cy.url().should('contain', 'flights/book')
})

//fill passanger form and submit
Given('I submit passanger personal info', () => {
    cy.get('#passenger_name_0')
      .click({force:true})
      .type(user.name)
    cy.get('#passenger_age_0')
      .click({force:true})
      .type(user.age)
    cy.get('#passenger_passport_0')
      .click({force:true})
      .type(user.passportNo) 
    cy.get('button.btn.btn-success.btn-lg.btn-block.completebook')
      .click()
})

Given('I submit guest info', () => {
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
      cy.get('button.btn.btn-success.btn-lg.btn-block.completebook')
      .click()
})

//check message about unpaid booking
Given('I should see message about unpaid booking', () => {
    cy.url()
      .should('contain', 'invoice')
    cy.get('.content')
      .contains('Your booking status is Unpaid')
      .should('be.visible')
})