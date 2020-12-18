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

    //sign up new user
    it('Sign up with correct info', () => {
        //sign up
        signUp.fillSignUpForm(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        signUp.signUp()
        //check info about added user in account page
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + data.firstName + ' ' + data.lastName)
        })
    })

    //try to sign up with email which was already added to registered user
    it('Try to sign up with email from previously added user', () => {
        //try to sign up
        signUp.fillSignUpForm(data.firstName, data.lastName, data.phone, data.email, data.password, data.password)
        signUp.signUp()
        //check if message that email already added is appear
        cy.get('.alert').then(label => {
            expect(label.text()).to.equal((' Email Already Exists. '))
        })
    })
})