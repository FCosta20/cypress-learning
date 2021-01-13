class Header {

    chooseCurrency(currencyCode) {
        cy.get('.dropdown-currency #dropdownCurrency')
            .click()
        cy.get('.dropdown-currency')
            .contains('.dropdown-item', currencyCode)
            .click()
    }

    navigateToLoginPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Login')
            .click()
    }

    navigateToRegistrationPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Sign Up')
            .click()
    }

    navigateToAccountPage() {
        cy.get('.dropdown-login #dropdownCurrency')
            .click()
        cy.contains('Account')
            .click()
    }

    navigateToHomePage() {
        cy.get('a[title="home"]')
            .click()
    }

}

export const header = new Header()