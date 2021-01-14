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
    it('should be book a flight', () => {
        homePage.getHeader()
            .navigateToLoginPage()

        loginPage.login(user.email, user.password)

        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)

        accountPage.getHeader()
            .navigateToHomePage()

        homePage.openFlightForm()

        homePage.selectBusinessClass()

        homePage.selectFlightCities(testData.cityFrom, testData.cityTo)

        homePage.selectFlightDay(new Date(testData.flightDate))

        homePage.addAdultToFlight()

        homePage.searchTheFlight()

        flightsPage.bookFirstFlight()

        bookFlightPage.fillPassengerData(testData.passengerName, testData.passengerAge, testData.passengerPassportNumber)
        bookFlightPage.confirmTheBooking()

        invoicePage.getBookingStatus()
            .should('contain', 'Unpaid')
        invoicePage.payOnArrival()
        invoicePage.getBookingStatus()
            .should('contain', 'Reserved')
    })

    // search the flight, check first airline checkbox in filter,
    // then verify that flights in list contains only flights from airline what was checked
    it('Flight list should be filtered by airline', () => {

        homePage.openFlightForm()

        homePage.selectFlightCities(testData.cityFrom, testData.cityTo)

        homePage.selectFlightDay(new Date(testData.flightDate))

        homePage.searchTheFlight()

        flightsPage.checkAirline(0).then(checkedAirlineName => {

            flightsPage.getAirlineListNames().each(listedAirlineName => {
                expect(checkedAirlineName).to.equal(listedAirlineName.text().trim())
            })
        })
    })

})
