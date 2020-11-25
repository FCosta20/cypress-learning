class AccountPage {

    getGreetingElement() {
        return cy.get('.container .align-items-center h3')
    }

}

export const accountPage = new AccountPage()
