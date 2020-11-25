
class LoginPage{

    logIn(email, password) {
        cy.get(':nth-child(1) > .pure-material-textfield-outlined > span').type(email)
        cy.get(':nth-child(2) > .pure-material-textfield-outlined > span').type(password)
        cy.get('form button[type="submit"]').contains('Login').click();
    }
}

export const onLoginPage = new LoginPage()