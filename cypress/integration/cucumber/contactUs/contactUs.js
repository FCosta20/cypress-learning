import {homePage} from "../../../support/pages/homePage";
import {contactUsPage} from "../../../support/pages/contactUsPage";


Given('I am on home page', () => {
    cy.openHomePage()
})

When('I open contact us page', () => {
    homePage.getFooter()
        .navigateToContactUsPage()
})

When('I fill all necessary fields', () => {
    cy.fixture('user').then(user => {

        cy.fixture('testData').then(testData => {
            contactUsPage.fillData(user.firstName, user.email, testData.contactSubject, testData.contactMessage)
        })
    })
})

Then('The captcha should be visible', () => {
    contactUsPage.getCaptchaForm()
        .should('be.visible')
})
