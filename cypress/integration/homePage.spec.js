import{onHomePage} from "../support/page_objects/homePage.js"
import{onLoginPage} from "../support/page_objects/loginPage.js"
import{onRegisterPage} from "../support/page_objects/registerPage.js"
import{onAccountPage} from "../support/page_objects/accountPage.js"

describe('login and register suite', ()=>{

    let user = {}

    before(() => {
        cy.fixture('register').then(register=> {
            user = register;
          });
      });

    beforeEach('open site', () => {
        cy.visit('/')
    })


    it('REGISTER USER', ()=>{
        // click on 'my account' button and choose 'log in' from dropdown menu
        onHomePage.goToLoginPage() 
        //find and click on the sign up button
        cy.get('.btn').parents('.zoomInDown')
                        .contains('Sign Up').click()
        // fill in all required field
        onRegisterPage.signUpPage(user.first_name,user.last_name,user.mobile_phone,user.email,user.password)
        // asssertion to check if user are directed to account page
        onAccountPage.findMyName()
                    .should('be.visible')
                    .and('contain', `Hi, ${user.first_name} ${user.last_name}`)
        // back to home page from account page
        onAccountPage.backToHomePage()
    })

    it('LOGIN USER',()=>{
        // click on 'my account' button and choose 'log in' from dropdown menu
        onHomePage.goToLoginPage()
        // on login page fill in required fields
        onLoginPage.logIn(user.email, user.password)
        // asssertion to check if user are directed to account page
        onAccountPage.findMyName()
                    .should('be.visible')
                    .and('contain', `Hi, ${user.first_name} ${user.last_name}`)
        // back to home page from account page
        onAccountPage.backToHomePage()    
    })

})