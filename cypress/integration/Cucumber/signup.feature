Feature: PHPTravelsTestsFeature
    PHPTravels tests for registration
    
    Background:
        Given I visit PHPTravelers site 

    Scenario: Test sign up as new user
        Given I click sign up button
        When I register new user
        Then I should be on my account page           

    Scenario: Test sign up with previously added email
        Given I click sign up button
        When I register new user
        Then I should see message that email already exists