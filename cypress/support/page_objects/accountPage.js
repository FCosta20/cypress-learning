class accountPage{

    backToHomePage() {
        cy.get('[title= "home"]').click()
    }

    findMyName() {
         return cy.get('.text-align-left')
    }
}

export const onAccountPage = new accountPage()