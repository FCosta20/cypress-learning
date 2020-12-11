class AccountPage {

    navigateToHomePage() {
        cy.get('a[title="home"]')
            .click()
    }

    getGreetingElement() {
        return cy.get('.container .align-items-center h3')
    }

}

export const accountPage = new AccountPage()
