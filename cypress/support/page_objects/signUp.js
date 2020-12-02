
class SignUp{

    //fill all the fields to register user
    signUpUser(firstName, lastName, phone, email, password){
        cy.contains('span', 'First Name').type(firstName)
        cy.contains('span', 'Last Name').type(lastName)
        cy.contains('span', 'Mobile Number').type(phone)
        cy.contains('span', 'Email').type(email)
        cy.contains('span', 'Password').type(password)
        cy.contains('span', 'Confirm Password').type(password)
        cy.contains('button', 'Sign Up').click()
    }
}

export const signUp = new SignUp()