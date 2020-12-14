import {homePage} from "../../../support/pages/homePage";
import {loginPage} from "../../../support/pages/loginPage";
import {accountPage} from "../../../support/pages/accountPage";
import {flightsPage} from "../../../support/pages/flightsPage";
import {bookFlightPage} from "../../../support/pages/bookFlightPage";
import {invoicePage} from "../../../support/pages/invoicePage";

Given('I am on home page', () => {
    cy.openHomePage()
})

When('I click My Account and Login link', () => {
    homePage.navigateToLoginPage()
})

When('I login with correct credentials', () => {
    cy.fixture('user').then(user => {
        homePage.navigateToLoginPage()
        loginPage.login(user.email, user.password)
    });
})

When('I navigate to search flight form', () => {
    accountPage.navigateToHomePage()
    homePage.clickFlightLink()
})

When(`I search the flight from {string} to {string}`, (cityFrom, cityTo) => {
    cy.fixture('testData').then(testData => {
        homePage.selectBusinessClass()
        homePage.selectFlightCities(cityFrom, cityTo)
        homePage.openFlightCalendar()
        homePage.selectFlightDay(new Date(testData.flightDate))
        homePage.addAdultToFlight()
        homePage.searchTheFlight()
    })
})

When('I book the first flight from the list', () => {
    flightsPage.bookFirstFlight()
})

When('I confirm the booking with passenger data', () => {
    cy.fixture('testData').then(testData => {
        bookFlightPage.fillPassengerData(testData.passengerName, testData.passengerAge, testData.passengerPassportNumber)
        bookFlightPage.confirmTheBooking()
    })
})

When('I choose pay on arrival', () => {
    invoicePage.payOnArrival()
})

Then('I should see greeting message', () => {
    cy.fixture('user').then(user => {
        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)
    });
})

Then('Booking status should be {string}', bookingStatus => {
    invoicePage.getBookingStatus()
        .should('contain', bookingStatus)
})
