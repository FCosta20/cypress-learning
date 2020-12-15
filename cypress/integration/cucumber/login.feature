Feature: LoginFeature
    As a customer,
    I want to be authorized,
    So that I can use all the features of the site.

    Background:
        Given I am on home page

    Scenario: Should be authorised
        When I navigate to login page
        And I login with correct credentials
        Then I should see greeting message
