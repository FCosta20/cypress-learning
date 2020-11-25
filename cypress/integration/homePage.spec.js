import{onHomePage} from "../support/page_objects/homePage.js"
import{onLoginPage} from "../support/page_objects/loginPage.js"
import{onRegisterPage} from "../support/page_objects/registerPage.js"

describe('log in suite', ()=>{

    let customer ={}
    let user = {}

    before(() => {
        cy.fixture('login').then(logIn=> {
          customer = logIn;
        });
        cy.fixture('register').then(register=> {
            user = register;
          });
      });

    beforeEach('open', () => {
        cy.visit('/')
    })
    it('log in',()=>{
        onHomePage.dropdownMenu()
        cy.get('.dropdown-menu').parent('div').find('.active')
            .should('contain.text', "Login").click()
        onLoginPage.logIn(customer.email, customer.password)

            if(cy.get('.alert').should('not.exist')) {
                cy.visit('/account')
            }else{
                cy.get('.zoomInDown > :nth-child(1) > .btn').click()
                onRegisterPage.signUpPage(user.first_name,user.last_name,user.mobile_phone,user.email,user.password)
                 
            }
       
    })
})