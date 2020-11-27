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


    it.only('should login user',()=>{
        onHomePage.goToLoginPage() 
        onLoginPage.logIn(user.email, user.password)
        onAccountPage.findMyName().should('be.visible').and('contain', `Hi, ${user.first_name} ${user.last_name}`)    })

    it('should registrate new user', ()=>{
        onHomePage.goToLoginPage() 
        cy.get('.zoomInDown > :nth-child(1) > .btn').click()
        onRegisterPage.signUpPage(user.first_name,user.last_name,user.mobile_phone,user.email,user.password)
        onAccountPage.findMyName().should('be.visible').and('contain', `Hi, ${user.first_name} ${user.llast_name}`)
        onAccountPage.backToHomePage()
    })
})