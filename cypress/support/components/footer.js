export class Footer {

    footerLocator = '#footer'

    navigateToContactUsPage() {
        cy.get(this.footerLocator)
            .contains('a', 'Contact')
            .click({force:true})
    }

}

export const footer = new Footer()