/// <reference types="cypress" />

const { homePage } = require("../support/page_objects/homePage")
const { loginPage } = require("../support/page_objects/loginPage")

describe('Tests for login', () => {

    //variable for using data from loginCredentials fixture
    let login = {}
    
    //take data from personalInfo fixture
    before(() => {
        cy.fixture('personalInfo').then((personalInfo) => {
            login = personalInfo;
        })
    })

    //open login page
    beforeEach('Open PHPTravelers and open login page', () => {
        cy.visit('/')
        homePage.openAccountDropdown()
        homePage.openLogInPage()
    })

    it('Login with correct credentials', () => {
        loginPage.fillLogInForm(login.email, login.password)
        loginPage.logIn()
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + login.firstName + ' ' + login.lastName)
        })
    })

    it('Login with incorrect password', () => {
        loginPage.fillLogInForm(login.email, login.incorrectPassword)
        loginPage.logIn()
        cy.get('.resultlogin')
          .should('contain', 'Invalid')
    })

})