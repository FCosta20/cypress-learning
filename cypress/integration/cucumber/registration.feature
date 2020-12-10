Feature: RegistrationFeature
    As a customer,
    I want to become a registered user,
    So I can use page functionalities.

    Background:
        Given I visit home page

    Scenario: Should be registered
        When I click My Account and Sign Up link
        And I register user with "Test", "User", "380964345445", "tt2857506@gmail.com" and "testtest2857506"
        Then I should be navigated to accountPage with greeting message: Hi, "Test" "User"

    Scenario: Should not be registered with different passwords
        When I click My Account and Sign Up link
        And I fill user info with "Test", "User", "380964345445", "tt2857506@gmail.com", "testtest2857506" and "testtest28575062" and click Sign In
        Then The error message "Password not matching with confirm password" should be visible

