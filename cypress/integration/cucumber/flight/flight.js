import {homePage} from "../../../support/pages/homePage";
import {loginPage} from "../../../support/pages/loginPage";
import {accountPage} from "../../../support/pages/accountPage";
import {flightsPage} from "../../../support/pages/flightsPage";
import {bookFlightPage} from "../../../support/pages/bookFlightPage";
import {invoicePage} from "../../../support/pages/invoicePage";


Given('I visit home page', () => {
    cy.openHomePage()
})

When('I click My Account and Login link', () => {
    homePage.navigateToLoginPage()
})

When(`I login with {string} and {string}`, (email, password) => {
    loginPage.login(email, password)
})

When('I navigate to home page and click flight link', () => {
    accountPage.navigateToHomePage()
    homePage.clickFlightLink()
})

When('I select business class', () => {
    homePage.selectBusinessClass()
})

When(`I select the flight from {string} to {string}`, (cityFrom, cityTo) => {
    homePage.selectFlightCities(cityFrom, cityTo)
})

When(`I select the flight day {string} from the calendar`, (flightDate) => {
    homePage.openFlightCalendar()
    homePage.selectFlightDay(new Date(flightDate))
})

When('I add one more adult to the flight', () => {
    homePage.addAdultToFlight()
})

When('I click search the flight', () => {
    homePage.searchTheFlight()
})

When('I choose the first flight from the list and click Book Now', () => {
    flightsPage.bookFirstFlight()
})

When(`I fill passenger data with {string}, {string} and {string}`, (name, age, passportNumber) => {
    bookFlightPage.fillPassengerData(name, age, passportNumber)
})

When('I click Confirm this booking', () => {
    bookFlightPage.confirmTheBooking()
})

When('I click pay on arrival', () => {
    invoicePage.payOnArrival()
})

Then(`I should be navigated to accountPage with greeting message: Hi, {string} {string}`, (firstName, lastName) => {
    accountPage.getGreetingElement()
        .should('contain',  `Hi, ${firstName} ${lastName}`)
})

Then('Booking status should be {string}', bookingStatus => {
    invoicePage.getBookingStatus().should('contain', bookingStatus)
})
