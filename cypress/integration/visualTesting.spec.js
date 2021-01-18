/// <reference types="cypress"/>

import {homePage} from "../support/pages/homePage";
import {matchElementScreenshot, matchPageSnapshot} from "../support/utils/screenshotUtils";

describe('Visual testing suite', () => {

    beforeEach(() => {
        cy.openHomePage();
    });

    it('should match flight form snapshot with existing snapshot', () => {
        homePage.openFlightForm()

        matchElementScreenshot(homePage.getFlightForm())
    })

    it('should match login page snapshot with existing snapshot', () => {
        homePage.getHeader()
            .navigateToLoginPage()

        matchPageSnapshot()
    })

})
