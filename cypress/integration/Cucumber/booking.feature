Feature: BookFlightFeature
    Book flight

    Background:
        Given I visit PHPTravelers site 

    Scenario: Book flight as logged in user
        When I open account dropdown
        Then I open login page
        When I fill in login form
        Then I login
        When I open home page
        Then I open flight form
        When I enter city from and city to
        And I select custom date
        And I select business class
        And I increase passangers quantity
        Then I start search
        When I select first flight result
        Then I fill in passanger form
        And I complete booking
        When I open invoice page
        Then I check if booking is unpaid

    Scenario: Book flight as guest
        Then I open flight form
        When I enter aeroport from and aeroport to
        And I select current date
        And I select business class
        And I increase passangers quantity
        Then I start search
        When I select first flight result
        Then I fill in guest form
        And I complete booking
        When I open invoice page
        Then I check if booking is unpaid