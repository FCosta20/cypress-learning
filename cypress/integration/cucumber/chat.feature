Feature: ChatFeature
  As a customer,
  I want to send the message to chat with bot,
  So that I can start chatting with bot.

  Scenario: Should be sent a message to chat
    Given I visit home page
    When I click to chat icon, fill user info with "Test", "380964345445", "tt2857506@gmail.com", select that I am existing user and click start the chat
    And I show more info about user in the chat
    Then The user name, whats up number and email should contain "Test", "380964345445" and "tt2857506@gmail.com"
    When I put "Hi, bot" to message field and click send message icon
    Then The last sent message should be "Hi, bot" with label "Delivered"
    And I close the chat
