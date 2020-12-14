Feature: PHPTravelsTestsFeature
    PHPTravels tests for registration and login

    Background:
        Given I visit PHPTravelers site

    Scenario: Test login with correct credentials
        Given I click login button
        When I login as user with correct credentials
        Then I should be on my account page

    Scenario: Test login with incorrect credentials
        Given I click login button
        When I login as user with incorrect credentials
        Then I should see message about invalid email or password
        