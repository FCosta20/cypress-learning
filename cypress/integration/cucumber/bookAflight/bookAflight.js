import{onHomePage} from "../../../support/page_objects/homePage.js"
import { onFlightListPage } from "../../../support/page_objects/flightListPage.js"
import { onBookingPage } from "../../../support/page_objects/bookingPage.js"
import { onInvoicePage } from "../../../support/page_objects/invoicePage.js"
import {flightFrom, flightTo, flightDate} from "../../../fixtures/flightInfo.json"
import {email, password, first_name, age, passport_number} from "../../../fixtures/register.json"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"


Given('I am on home page', () => {
    cy.visit('/')
})

When('I navigate to search flight form', () => {
    onHomePage.goToBookingFlight()
})

And('I search the flight from "London" to "New York"', () => {
    onHomePage.goToBookingFlight()
    onHomePage.chooseACity(bookFlight.flightFrom, bookFlight.flightTo)
    onHomePage.addAdultToFlight()
    onHomePage.chooseBusinessClass
    onHomePage.getDatePicker()
    onHomePage.selectFlightDay(new Date(flightDate))
    onHomePage.findFlight()
})

When('I book the first flight from the list', () => {
    onFlightListPage.bookFirstFlight()
})

And('I sign in and confirm the booking with passenger data', () => {
    onBookingPage.signIn(email, password)
    onBookingPage.fillInPassengersData(first_name, age, passport_number)
    onBookingPage.confirmTheBooking()    
})

Then('Booking status should be "Unpaid"', () => {
    onInvoicePage.checkIfBookingIsUnpaid()
})


