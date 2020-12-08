class RegistrationPage {

    register(firstName, lastName, phoneNumber, email, password, confirmPassword) {
        cy.get('input[name="firstname"]')
            .type(firstName, {force: true})
        cy.get('input[name="lastname"]')
            .type(lastName, {force: true})
        cy.get('input[name="phone"]')
            .type(phoneNumber, {force: true})
        cy.get('input[name="email"]')
            .type(email, {force: true})
        cy.get('input[name="password"]')
            .type(password, {force: true})
        cy.get('input[name="confirmpassword"]')
            .type(confirmPassword, {force: true})
        cy.get('button').contains('Sign Up')
            .click()
    }

    getErrorMessage() {
        return cy.get('#login .alert-danger p')
    }

}

export const registrationPage = new RegistrationPage()

