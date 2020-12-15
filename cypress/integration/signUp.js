const { homePage } = require("../support/page_objects/homePage");
const { signUp } = require("../support/page_objects/signUp");

describe('Register test', () => {
    
    //variable for using data from fixtures
    let data = {}

    //take data from personalInfo fixture
    before(() => {
        cy.fixture('personalInfo').then((personalInfo) => {
            data = personalInfo;
        })
    })

    //open PHPTravels and then register page
    beforeEach('Open PHPTravels', () => {
        cy.visit('/')
        homePage.openAccountDropdown()
        homePage.openSignUpPage()
    })

    it('Sign up with correct info', () => {
        signUp.fillSignUpForm(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        signUp.signUp()
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + data.firstName + ' ' + data.lastName)
        })
    })

    it('Try to sign up with email from previously added user', () => {
        signUp.fillSignUpForm(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        signUp.signUp()
        cy.get('.alert').then(label => {
            expect(label.text()).to.equal((' Email Already Exists. '))
        })
    })
})