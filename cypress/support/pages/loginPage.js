class LoginPage {

    login(email, password) {
        cy.get('input[name="username"]')
            .type(email, {force: true})
        cy.get('input[name="password"]')
            .type(password, {
                force: true,
                log: false
            })
        cy.get('button')
            .contains('Login')
            .click()
    }

    clearInputs() {
        cy.get('input[name="username"]')
            .clear({force: true})
        cy.get('input[name="password"]')
            .clear({force: true})
    }

    getErrorMessage() {
        return cy.get('#loginfrm .alert-danger')
    }

}

export const loginPage = new LoginPage()

