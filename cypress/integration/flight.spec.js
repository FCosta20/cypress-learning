/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {loginPage} from "../support/pages/loginPage";
import {accountPage} from "../support/pages/accountPage";
import {flightsPage} from "../support/pages/flightsPage";
import {bookFlightPage} from "../support/pages/bookFlightPage";
import {invoicePage} from "../support/pages/invoicePage";

describe('Flight suite', () => {

    let user = {}
    let testData = {}

    before(() => {
        cy.fixture('user').then(localUser => {
            user = localUser;
        });
        cy.fixture('testData').then(localTestData => {
            testData = localTestData;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    // login, go to home page, click flight link select cityFrom, cityTo, flight date,
    // add one child and search the flight, choose the first flight from list,
    // fill passenger info on the booking flight page and click confirm the booking,
    // check that booking status Unpaid then click and confirm pay on arrival
    // and check that booking status was changed to Reserved
    it('should be sent a message to chat', () => {
        homePage.navigateToLoginPage()

        loginPage.login(user.email, user.password)

        accountPage.navigateToHomePage()

        homePage.clickFlightLink()

        homePage.selectFlightCities(testData.cityFrom, testData.cityTo)

        homePage.openFlightCalendar()
        const date = new Date()
        date.setDate(date.getDate() + testData.daysBeforeTheFlight)
        homePage.selectFlightDay(date)

        homePage.addChildToFlight()

        homePage.searchTheFlight()

        flightsPage.bookFirstFlight()

        bookFlightPage.fillPassengerData(testData.passengerName, testData.passengerAge, testData.passengerPassportNumber)
        bookFlightPage.confirmTheBooking()

        invoicePage.getBookingStatus().should('contain', 'Unpaid')
        invoicePage.payOnArrival()
        invoicePage.getBookingStatus().should('contain', 'Reserved')
    })

})
