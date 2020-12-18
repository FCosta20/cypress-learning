
class registerPage {
    
    signUpPage(first_name,last_name,mobile_phone,email,password) {
        cy.get('[name = "firstname"]')
            .siblings()
            .type(first_name)
        cy.get('[name = "lastname"]')
            .siblings()
            .type(last_name)
        cy.get('[name = "phone"]')
            .siblings()
            .type(mobile_phone)
        cy.get('[name = "email"]')
            .siblings()
            .type(email)
        cy.get('[name = "password"]')
            .siblings()
            .type(password)
        cy.get('[name = "confirmpassword"]')
            .siblings()
            .type(password)
        cy.get('.signupbtn')
            .click()
        
    }
}


export const onRegisterPage = new registerPage()