
class HomePage{

    openLogInPage(){
        cy.contains('div', 'My Account').click()
        cy.contains('Login').click()
    }

    logOut(){
        cy.get('.dropdown-login').click()
        cy.contains('Logout').click()
    }
}

export const homePage = new HomePage()