import{onHomePage} from "../support/page_objects/homePage.js"
import{onLoginPage} from "../support/page_objects/loginPage.js"
import{onRegisterPage} from "../support/page_objects/registerPage.js"
import{onAccountPage} from "../support/page_objects/accountPage.js"
import { onFlightListPage } from "../support/page_objects/flightListPage.js"
import { onBookingPage } from "../support/page_objects/bookingPage.js"
import { onInvoicePage } from "../support/page_objects/invoicePage.js"

describe('login and register suite', ()=>{

    let user = {}
    let bookFlight = {}

    before(() => {
        cy.fixture('register').then(register=> {
            user = register;
          });
        cy.fixture('flightInfo').then(flightInfo=>{
            bookFlight = flightInfo;
        })
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

    it('BOOK A FLIGHT AS A REGISTERED USER', ()=>{
        // in the home page user get the booking form and write down 
        // some information about cities,date of flight and number of passengers
        // and after click button to find flight that user can book
        onHomePage.goToBookingFlight()
        onHomePage.bookFlight(bookFlight.flightFrom, bookFlight.flightTo)
        onHomePage.getDatePicker()
        onHomePage.selectFlightDay(new Date(bookFlight.flightDate))
        onHomePage.findFlight()
        // choose the first flight from the list
        onFlightListPage.bookFirstFlight()

        // its needed to sign in and fill in the passengers field to confirm the booking
        onBookingPage.signIn(user.email,user.password)
        onBookingPage.fillInPassengersData(user.first_name,user.age,user.passport_number)
        onBookingPage.confirmTheBooking()
        //just checking the booking status
        onInvoicePage.checkIfBookingIsUnpaid()
    })
})