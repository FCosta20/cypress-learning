Feature: RegistrationFeature
    As a customer,
    I want to become a registered user,
    So I can use page functionalities.

    Background:
        Given I am on home page

    Scenario: Should be registered
        When I navigate to sign up page
        And I register user with personal data
        Then I should see greeting message