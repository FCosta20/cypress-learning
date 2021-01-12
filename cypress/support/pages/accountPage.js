class AccountPage {

    navigateToHomePage() {
        cy.get('a[title="home"]')
            .click()
    }

    getGreetingElement() {
        return cy.get('.container .align-items-center h3')
    }

    openWishList() {
        cy.get('a[href="#wishlist"]')
            .click()
    }

    getHotelTextElement(hotelName) {
        return cy.get('.mywishlist a.RTL')
            .contains('a', hotelName)
    }

}

export const accountPage = new AccountPage()
