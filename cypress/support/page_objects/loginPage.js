
class LoginPage{

    logInUser(email, password){
        cy.contains('Email')
          .type(email)
        cy.contains('Password')
          .type(password)
        cy.contains('button', 'Login')
          .click()
    }
    
}

export const loginPage = new LoginPage()