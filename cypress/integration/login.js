/// <reference types="cypress" />

const { homePage } = require("../support/page_objects/homePage")
const { loginPage } = require("../support/page_objects/loginPage")

describe('Tests for login', () => {

    let data = {}

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
        cy.contains('Hi, Kateryna Buchkovska').should('be.visible')
        homePage.logOut()
    })

    it('Login with incorrect password', () => {
        loginPage.logInUser(data.email, data.incorrectPassword)
        cy.get('.resultlogin').should('contain', 'Invalid')
    })

})