import {homePage} from "../../../support/pages/homePage";
import {loginPage} from "../../../support/pages/loginPage";
import {accountPage} from "../../../support/pages/accountPage";
import {hotelDetailPage} from "../../../support/pages/hotelDetailPage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I click My Account and Login link', () => {
    homePage.getHeader()
        .navigateToLoginPage()
})

When('I login with correct credentials', () => {
    cy.fixture('user').then(user => {
        homePage.getHeader()
            .navigateToLoginPage()
        loginPage.login(user.email, user.password)
    });
})

When('I open home page', () => {
    accountPage.getHeader()
        .navigateToHomePage()
})

When('I add the first hotel to wish list', () => {
    homePage.chooseFirstHotel()

    hotelDetailPage.getHotelName().as('hotelName')

    hotelDetailPage.getWishListButtonText()
        .should('contain', 'Add to wishlist')

    hotelDetailPage.addToWishlist()
})

When('I open account page and wish list', () => {
    hotelDetailPage.getHeader()
        .navigateToAccountPage()

    accountPage.openWishList()
})

Then('I should see greeting message', () => {
    cy.fixture('user').then(user => {
        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)
    });
})

Then('Add to wishlist button should be renamed', () => {
    hotelDetailPage.getWishListButtonText()
        .should('contain', 'Remove from wishlist')
})

Then('Adding hotel should be in wishlist', () => {
    cy.get('@hotelName').then(hotelName => {
        accountPage.getHotelTextElement(hotelName)
            .should('be.visible')
    })
})
