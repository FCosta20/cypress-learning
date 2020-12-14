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

    Scenario: Should be authorised with last email and password
        When I navigate to login page
        And I login as following
            | email                | password         |
            | tt28575062@gmail.com | testtest28575062 |
            | tt28575063@gmail.com | testtest28575063 |
            | tt2857506@gmail.com  | testtest2857506  |
        Then I should see greeting message

    Scenario: Should not be authorised with wrong password
        When I navigate to login page
        And I login with wrong password
        Then I should see an error message
