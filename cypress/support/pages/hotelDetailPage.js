import {header} from "../components/header";

class HotelDetailPage {

    getHeader() {
        return header
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