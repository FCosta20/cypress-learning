import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

//variable for giving data from personalInfo fixture
let login = {}

before(() => {
    cy.fixture('personalInfo').then((personalInfo) => {
        login = personalInfo;
    })
})

//open site
Given('I visit PHPTravelers site', () => {
    cy.visit('http://www.phptravels.net/home')
})

//open sign up page
Given('I click sign up button', () => {
    cy.contains('div', 'My Account')
      .click()
    cy.contains('Sign Up')
      .click()
})

//fill registration form
Given('I register new user', () => {
    cy.contains('span', 'First Name')
          .type(login.firstName)
        cy.contains('span', 'Last Name')
          .type(login.lastName)
        cy.contains('span', 'Mobile Number')
          .type(login.phone)
        cy.contains('span', 'Email')
          .type(login.email)
        cy.contains('span', 'Password')
          .type(login.password)
        cy.contains('span', 'Confirm Password')
          .type(login.password)
        cy.contains('button', 'Sign Up')
          .click()
})

//check redirection to account page
Given('I should be on my account page', () => {
    cy.get('.text-align-left').then(label => {
        expect(label.text()).to.equal('Hi, ' + login.firstName + ' ' + login.lastName)
    })
})

//check message about email is already exist
Given('I should see message that email already exists', () => {
    cy.get('.alert').then(label => {
        expect(label.text()).to.equal((' Email Already Exists. '))
    })
})