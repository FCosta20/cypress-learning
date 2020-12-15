
class LoginPage{

    fillLogInForm(email, password){
      cy.contains('Email')
        .type(email)
      cy.contains('Password')
        .type(password)
    }

    logIn(){
      cy.contains('button', 'Login')
        .click()
    }
}

export const loginPage = new LoginPage()