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

    //search flight by aeroport name for loged in user
    it('Search flight as loged in user', () => {
        //fill flight search form
        homePage.openLogInPage()
        loginPage.fillLogInForm(user.email, user.password)
        loginPage.logIn()
        //cehck user info in account page
        cy.get('.text-align-left').then(label => {
            expect(label.text()).to.equal('Hi, ' + user.firstName + ' ' + user.lastName)
        })
        //open home page
        header.openHomePage()
        //fill flight search form
        homePage.openFlightForm()
        homePage.selectAeroportFrom(flight.aeroportFrom)
        homePage.selectAeroportTo(flight.aeroportTo)
        homePage.selectCurrentDay()
        homePage.startSearch()
        //select first result in the list
        searchPage.selectFirstFlightResult()
        //fill info about passenger
        bookPage.checkIfBookingPageIsOpened()
        bookPage.fillBookingAsLogedInUser(user.firstName, user.age, user.passportNo)
        bookPage.completeBooking()
        //check booking status
        invoicePage.openInvoicePage()
        invoicePage.checkIfBookingIsUnpaid()
    })

    //search flight by city name for guest
    it.only('Search flight without login', () => {
        //fill flight search form
        homePage.openFlightForm()
        homePage.selectBusinessClass()
        homePage.selectCityFrom(flight.cityFrom)
        homePage.selectCityTo(flight.cityTo)
        homePage.increasePassengers()
        homePage.selectDay(flight.futureDay, flight.futureMonth, flight.futureYear)
        //click search button
        homePage.startSearch()
        //select first result in the list
        searchPage.selectFirstFlightResult()
        //fill info about passenger
        bookPage.checkIfBookingPageIsOpened()
        bookPage.fillBookingAsGuest(guest.firstName, guest.lastName, guest.email, guest.phone, guest.address)
        bookPage.completeBooking()
        //check booking status
        invoicePage.openInvoicePage()
        invoicePage.checkIfBookingIsUnpaid()
    })

})