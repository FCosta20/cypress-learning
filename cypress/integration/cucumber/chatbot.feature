Feature: ChatBotFeature
  As a customer,
  I want to send the message to chat with bot,
  So that I can start chatting with bot.

  Scenario: Should be sent a message to chat
    Given I am on home page
    When I start the chat with user info
    And I send a message
    Then I close the chat