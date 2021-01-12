class ContactUsPage {

    fillData(name, email, subject, message) {
        cy.get('#form_name')
            .type(name, {force:true})
        cy.get('#form_email')
            .type(email, {force:true})
        cy.get('#form_subject')
            .type(subject, {force:true})
        cy.get('#form_message')
            .type(message, {force:true})

        cy.get('.g-recaptcha iframe').then(iframe => {
            const body = iframe.contents().find('body')

            cy.wrap(body)
                .find('#recaptcha-anchor')
                .click()

            cy.wait(2000)

            // cy.get('[name="submit_contact"]')
            //     .click()
        })
    }

    getCaptchaForm() {
        return cy.get('iframe[title="recaptcha challenge"]')
            .then(iframe => {
                const body = iframe.contents().find('body')

                return cy.wrap(body).find('#rc-imageselect')
            })
    }

    getSuccessMessage() {
        return cy.get('.alert-success i').then(messageElem => {
            return messageElem.text().trim()
        })
    }

}

export const contactUsPage = new ContactUsPage()