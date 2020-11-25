
class registerPage {
    
    signUpPage(first_name,last_name,mobile_phone,email,password) {
        cy.get('.row > :nth-child(1) > .form-group > .pure-material-textfield-outlined > span').type(first_name)
        cy.get(':nth-child(2) > .form-group > .pure-material-textfield-outlined > span').type(last_name)
        cy.get(':nth-child(4) > .pure-material-textfield-outlined > span').type(mobile_phone)
        cy.get(':nth-child(5) > .pure-material-textfield-outlined > span').type(email)
        cy.get(':nth-child(6) > .pure-material-textfield-outlined > span').type(password)
        cy.get(':nth-child(7) > .pure-material-textfield-outlined > span').type(password)
        cy.get('.signupbtn').click()
    }
}


export const onRegisterPage = new registerPage()