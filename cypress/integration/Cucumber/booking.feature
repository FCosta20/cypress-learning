Feature: BookFlightFeature
    Book flight

    Background:
        Given I visit PHPTravelers site 

    Scenario: Book flight as logged in user
        Given I log in 
        Given I open flight search form
        Given I search for flight
        Given I select first flight
        Given I submit passanger personal info
        Then I should see message about unpaid booking

    Scenario: Book flight as guest
        Given I open flight search form
        Given I search for flight
        Given I select first flight
        Given I submit guest info
        Then I should see message about unpaid booking