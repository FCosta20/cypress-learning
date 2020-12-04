/// <reference types="cypress" />

const { homePage } = require("../support/page_objects/homePage")
const { loginPage } = require("../support/page_objects/loginPage")
const { signUp } = require("../support/page_objects/signUp")

describe('Tests for login', () => {

    //variable for using data from loginCredentials fixture
    let login = {}

    //variable for using data from signUpUserInfo fixture
    let signUp = {}

    
    before(() => {
        //take data from loginCredentials fixture
        cy.fixture('loginCredentials').then((loginCredentials) => {
            login = loginCredentials;
        })
        //take data from signUpUserInfo fixture
        cy.fixture('signUpUserInfo').then((signUpUserInfo) => {
            signUp = signUpUserInfo;
        })
    })

    beforeEach('Open PHPTravelers and open login page', () => {
        cy.visit('/')
        homePage.openLogInPage()
    })

    it('Login with correct credentials', () => {
        loginPage.logInUser(login.email, login.password)
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + signUp.firstName + ' ' + signUp.lastName)
        })
    })

    it('Login with incorrect password', () => {
        loginPage.logInUser(login.email, login.incorrectPassword)
        cy.get('.resultlogin')
          .should('contain', 'Invalid')
    })

})