const { bookPage } = require("../support/page_objects/bookPage")
const { header } = require("../support/page_objects/header")
const { homePage } = require("../support/page_objects/homePage")
const { invoicePage } = require("../support/page_objects/invoicePage")
const { loginPage } = require("../support/page_objects/loginPage")
const { searchPage } = require("../support/page_objects/searchPage")

describe('Search form', () => {

    //variable for gigving data from personalInfo fixture
    let user = {}

    //variable for gigving data from guestInfo fixture
    let guest = {}

    //variable for gigving data from bookFlight fixture
    let flight = {}

    //take data from personalInfo and bookFlight fixture
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

    //open PHPtravels
    beforeEach('Open PHPtravels home page', () => {
        cy.visit('/')
    })

    //search flight for loged in user
    it('Search flight as loged in user', () => {
        homePage.openLogInPage()
        loginPage.logInUser(user.email, user.password)
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + user.firstName + ' ' + user.lastName)
        })
        header.openHomePage()
        cy.url().should('eq', 'https://www.phptravels.net/home')
        homePage.searchFlightByAeroport(flight.cityFrom, flight.aeroportTo)
        searchPage.bookFirstFlightResult()
        bookPage.fillBookingAsLogedInUser(user.firstName, user.age, user.passportNo)
        invoicePage.openInvoicePage()
    })

    //search flight for guest
    it.only('Search flight without login', () => {
        homePage.selectFlightBuCity(flight.cityFrom, flight.cityTo)
        searchPage.bookFirstFlightResult()
        bookPage.fillBookingAsGuest(guest.firstName, guest.lastName, guest.email, guest.phone, guest.address)
        invoicePage.openInvoicePage()
    })




})