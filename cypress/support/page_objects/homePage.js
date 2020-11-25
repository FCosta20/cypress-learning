
class HomePage{

    dropdownMenu() {
        cy.get('ul>li').eq(2).click()
    }
    
}

export const onHomePage = new HomePage()