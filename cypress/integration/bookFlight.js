const { bookPage } = require("../support/page_objects/bookPage")
const { header } = require("../support/page_objects/header")
const { homePage } = require("../support/page_objects/homePage")
const { invoicePage } = require("../support/page_objects/invoicePage")
const { loginPage } = require("../support/page_objects/loginPage")
const { searchPage } = require("../support/page_objects/searchPage")

describe('Search form', () => {

    //variable for gigving data from personalInfo fixture
    let login = {}

    //variable for gigving data from bookFligh fixture
    let info = {}

    //take data from personalInfo and bookFlight fixture
    before(() => {
        cy.fixture(('personalInfo')).then(personalInfo => {
            login = personalInfo
        })
        cy.fixture(('bookFlight')).then( bookFlight => {
            info = bookFlight;
        })
    })

    //login and open home page
    beforeEach(' Login and open PHPtravels home page', () => {
        cy.visit('/')
        homePage.openLogInPage()
        loginPage.logInUser(login.email, login.password)
        cy.wait(2000)
        header.openHomePage()
        cy.wait(2000)
        cy.url().should('eq', 'https://www.phptravels.net/home')
    })

    it('Search flight', () => {
        homePage.searchFlight(info.aeroportFrom, info.aeroportTo)
        searchPage.bookFirstFlightResult()
        bookPage.fillBooking(login.firstName, login.age, login.passportNo)
        invoicePage.openInvoicePage()
    })


})