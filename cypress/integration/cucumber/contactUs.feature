Feature: ContactUsFeature


  Scenario: User can not contact us without verifying captcha
    Given I am on home page
    When I open contact us page
    And I fill all necessary fields
    Then The captcha should be visible
