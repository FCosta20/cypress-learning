/// <reference types="cypress" />

const { homePage } = require("../support/page_objects/homePage")
const { loginPage } = require("../support/page_objects/loginPage")

describe('Tests for login', () => {

    //variable for using data from fixtures
    let data = {}

    //take data from loginCredentials fixture
    before(() => {
        cy.fixture('loginCredentials').then((loginCredentials) => {
            data = loginCredentials;
        })
    })

    beforeEach('Open PHPTravelers and open login page', () => {
        cy.visit('/')
        homePage.openLogInPage()
    })

    it('Login with correct credentials', () => {
        loginPage.logInUser(data.email, data.password)
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + data.firstName + ' ' + data.lastName)
        })
    })

    it('Login with incorrect password', () => {
        loginPage.logInUser(data.email, data.incorrectPassword)
        cy.get('.resultlogin').should('contain', 'Invalid')
    })

})