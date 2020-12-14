Feature: RegistrationFeature
    As a customer,
    I want to become a registered user,
    So I can use page functionalities.

    Background:
        Given I am on home page

    Scenario: Should be registered
        When I navigate to sign up page
        And I register user with user data
        Then I should see greeting message

    Scenario: Should not be registered with different passwords
        When I navigate to sign up page
        And I register user with different passwords
        Then I should see an error message
