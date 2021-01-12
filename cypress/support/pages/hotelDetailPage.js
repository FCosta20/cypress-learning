class HotelDetailPage {

    navigateToAccountPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Account')
            .click()
    }

    getHotelName() {
        return cy.get('h2.name')
            .invoke('text')
    }

    addToWishlist() {
        cy.get('.btn.wish')
            .click()
        cy.on('window:confirm', () => true)
    }

    getWishListButtonText() {
        return cy.get('.btn.wish')
            .invoke('text')
    }

}

export const hotelDetailPage = new HotelDetailPage()