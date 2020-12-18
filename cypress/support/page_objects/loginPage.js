
class LoginPage{

  //fill in login form
    fillLogInForm(email, password){
      cy.contains('Email')
        .type(email)
      cy.contains('Password')
        .type(password)
    }

    //log in
    logIn(){
      cy.contains('button', 'Login')
        .click()
    }
}

export const loginPage = new LoginPage()