Feature: CurrencyFeature


    Scenario Outline: Currency code should have appropriate currency symbol in prices
        Given I am on home page
        When I choose "<code>" currency code
        Then I should have prices in appropriate currency code "<code>" and currency symbol "<symbol>"

        Examples:
            | code | symbol |
            | USD  |   $    |
            | EUR  |   €    |
            | GBP  |   £    |
