/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {loginPage} from "../support/pages/loginPage";
import {accountPage} from "../support/pages/accountPage";
import {flightsPage} from "../support/pages/flightsPage";
import {bookFlightPage} from "../support/pages/bookFlightPage";
import {invoicePage} from "../support/pages/invoicePage";
import {hotelDetailPage} from "../support/pages/hotelDetailPage";

describe('Flight suite', () => {

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

    it('should be book a flight', () => {
        homePage.navigateToLoginPage()

        loginPage.login(user.email, user.password)

        accountPage.getGreetingElement()
            .should('contain',  `Hi, ${user.firstName} ${user.lastName}`)

        accountPage.navigateToHomePage()

        homePage.chooseFirstHotel()

        hotelDetailPage.getHotelName().then(hotelName => {

            hotelDetailPage.getWishListButtonText().should('contain', 'Add to wishlist')

            hotelDetailPage.addToWishlist()

            hotelDetailPage.getWishListButtonText().should('contain', 'Remove from wishlist')

            hotelDetailPage.navigateToAccountPage()

            accountPage.openWishList()

            accountPage.getHotelTextElement(hotelName).should('be.visible')
        })
    })

})
