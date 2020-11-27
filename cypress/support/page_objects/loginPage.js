
class LoginPage{

    logIn(email, password) {
        cy.get('[name= "username"').siblings().type(email)
        cy.get('[name = "password"]').siblings().type(password)
        cy.get('form button[type="submit"]').contains('Login').click();
    }
}

export const onLoginPage = new LoginPage()