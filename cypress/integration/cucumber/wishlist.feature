Feature: WishlistFeature


    Scenario: First hotel should be added to wishlist
        Given I am on home page
        And I login with correct credentials
        Then I should see greeting message
        When I open home page
        And I add the first hotel to wish list
        Then Add to wishlist button should be renamed
        When I open account page and wish list
        Then Adding hotel should be in wishlist
