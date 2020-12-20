Feature: FlightFeature
    As a customer,
    I want to be able to book a flight,
    So that I can save the time and book a flight online.

    Scenario: Should be book a flight
      Given I am on home page
      And I login with correct credentials
      Then I should see greeting message
      When I navigate to search flight form
      And I search the flight from "London" to "New York"
      And I book the first flight from the list
      Then Booking status should be "Unpaid"
      When I choose pay on arrival
      Then Booking status should be "Reserved"
