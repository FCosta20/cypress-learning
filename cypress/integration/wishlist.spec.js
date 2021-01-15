/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {loginPage} from "../support/pages/loginPage";
import {accountPage} from "../support/pages/accountPage";
import {hotelDetailPage} from "../support/pages/hotelDetailPage";

describe('Wishlist suite', () => {

    let user = {}
    let testData = {}

    before(() => {
        cy.fixture('user').then(localUser => {
            user = localUser;
        });
        cy.fixture('testData').then(localTestData => {
            testData = localTestData;
        });
    });

    beforeEach(() => {
        cy.openHomePage();
    });

    it('First hotel should be added to wishlist', () => {
        homePage.getHeader()
            .navigateToLoginPage()

        loginPage.login(user.email, user.password)

        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)

        accountPage.getHeader()
            .navigateToHomePage()

        homePage.chooseFirstHotel()

        hotelDetailPage.getHotelName().then(hotelName => {

            hotelDetailPage.getWishListButtonText()
                .should('contain', 'Add to wishlist')

            hotelDetailPage.addToWishlist()

            hotelDetailPage.getWishListButtonText()
                .should('contain', 'Remove from wishlist')

            hotelDetailPage.getHeader()
                .navigateToAccountPage()

            accountPage.openWishList()

            accountPage.getHotelTextElement(hotelName)
                .should('be.visible')
        })
    })

})
