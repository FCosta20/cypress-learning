import{onHomePage} from "../support/page_objects/homePage.js"
import { onFlightListPage } from "../support/page_objects/flightListPage.js"
import { onBookingPage } from "../support/page_objects/bookingPage.js"
import { onInvoicePage } from "../support/page_objects/invoicePage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

let user = {}
let bookFlight = {}

before(() => {
    cy.fixture('register').then(register=> {
        user = register;
      });
    cy.fixture('flightInfo').then(flightInfo=>{
        bookFlight = flightInfo;
    })
  });

Given('I am on home page', () => {
    cy.visit('/')
})

When('I navigate to search flight form', () => {
    onHomePage.goToBookingFlight()
})

And('I search the flight from "London" to "New York"', () => {
    onHomePage.goToBookingFlight()
    onHomePage.bookFlight(bookFlight.flightFrom, bookFlight.flightTo)
    onHomePage.getDatePicker()
    onHomePage.selectFlightDay(new Date(bookFlight.flightDate))
    onHomePage.findFlight()
})

When('I book the first flight from the list', () => {
    onFlightListPage.bookFirstFlight()
})

And('I sign in and confirm the booking with passenger data', () => {
    onBookingPage.signIn(user.email,user.password)
    onBookingPage.fillInPassengersData(user.first_name,user.age,user.passport_number)
    onBookingPage.confirmTheBooking()    
})

Then('Booking status should be "Unpaid"', () => {
    onInvoicePage.checkIfBookingIsUnpaid()
})


