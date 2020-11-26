const { homePage } = require("../support/page_objects/homePage");
const { signUp } = require("../support/page_objects/signUp");

describe('Register test', () => {
    
    let data = {}

    before(() => {
        cy.fixture('signUpUserInfo').then((signUpUserInfo) => {
            data = signUpUserInfo;
        })
    })

    beforeEach('Open PHPTravels', () => {
        cy.visit('/')
        homePage.openSignUpPage()
    })

    it.only('Sign up with correct info', () => {
        signUp.signUpUser(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + data.firstName + ' ' + data.lastName)
        })
    })

    it('Try to sign up with email from previously added user', () => {
        signUp.signUpUser(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        cy.get('.alert').then(label => {
            expect(label.text()).to.equal((' Email Already Exists. '))
        })
    })
})