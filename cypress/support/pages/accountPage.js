class AccountPage {

    navigateToHomePage() {
        cy.wait(2000)
        cy.get('a')
            .contains('Home')
            .click()
    }

    getGreetingElement() {
        return cy.get('.container .align-items-center h3')
    }

}

export const accountPage = new AccountPage()
