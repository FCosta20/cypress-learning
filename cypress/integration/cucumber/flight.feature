Feature: FlightFeature
    As a customer,
    I want to be able to book a flight,
    So that I can save the time and book a flight online.

    Scenario: Should be book a flight
      Given I visit home page
      When I click My Account and Login link
      And I login with "tt2857506@gmail.com" and "testtest2857506"
      Then I should be navigated to accountPage with greeting message: Hi, "Test" "User"
      And I navigate to home page and click flight link
      And I select business class
      And I select the flight from "London" to "New York"
      And I select the flight day "March 24, 2021" from the calendar
      And I add one more adult to the flight
      And I click search the flight
      And I choose the first flight from the list and click Book Now
      And I fill passenger data with "User2", "22" and "KR643864"
      And I click Confirm this booking
      Then Booking status should be "Unpaid"
      When I click pay on arrival
      Then Booking status should be "Reserved"


