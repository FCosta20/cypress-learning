Feature: BookAFlightFeature
    As a customer,
    I want to be able to book a flight,
    So that I can choose airports and save the time and book a flight online.

    Scenario: Should be book a flight
      Given I am on home page
      When I navigate to search flight form
      And I search the flight from "London" to "New York"
      When I book the first flight from the list
      And I sign in and confirm the booking with passenger data
      Then Booking status should be "Unpaid"