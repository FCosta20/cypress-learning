Feature: LoginFeature
    As a customer,
    I want to be authorized,
    So that I can use all the features of the site.

    Background:
        Given I visit home page

    Scenario: Should be authorised
        When I click My Account and Login link
        And I login with "tt2857506@gmail.com" and "testtest2857506"
        Then I should be navigated to accountPage with greeting message: Hi, "Test" "User"

    Scenario: Should not be authorised with wrong password
        When I click My Account and Login link
        And I login with "tt2857506@gmail.com" and "testtest228575062"
        Then The error message "Invalid Email or Password" should be visible

