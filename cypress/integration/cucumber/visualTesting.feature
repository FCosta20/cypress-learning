Feature: VisualTestingFeature


  Scenario: Should match flight form snapshot with existing snapshot
    Given I am on home page
    When I open flight form
    Then I match flight form snapshot

  Scenario: Should match login page snapshot with existing snapshot
    Given I am on home page
    When I navigate to login page
    Then I match page snapshot snapshot
