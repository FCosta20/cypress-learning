
class HomePage{

    openLogInPage(){
        cy.contains('div', 'My Account')
          .click()
        cy.contains('Login')
          .click()
    }

    openSignUpPage(){
        cy.contains('div', 'My Account')
          .click()
        cy.contains('Sign Up')
          .click()
    }
}

export const homePage = new HomePage()