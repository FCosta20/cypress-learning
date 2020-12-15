
class BookPage{

    fillBookingAsLogedInUser(name, age, passportNo){
        cy.get('#passenger_name_0')
          .click({force:true})
          .type(name)
        cy.get('#passenger_age_0')
          .click({force:true})
          .type(age)
         cy.get('#passenger_passport_0')
           .click({force:true})
           .type(passportNo) 
    }

    fillBookingAsGuest(firstName, lastName, email, phone, address){
      cy.get('input[name="firstname"]')
        .click({force:true})
        .type(firstName)
      cy.get('input[name="lastname"]')
        .click({force:true})
        .type(lastName)
      cy.get('input[name="email"]')
        .click({force:true})
        .type(email)
      cy.get('input[name="confirmemail"]')
        .click({force:true})
        .type(email)
      cy.get('input[name="phone"]')
        .click({force:true})
        .type(phone)
      cy.get('input[name="address"]')
        .click({force:true})
        .type(address)
      cy.get('div.chosen-container.chosen-container-single')
        .click()
        .should('have.attr', 'class', 'chosen-container chosen-container-single chosen-with-drop chosen-container-active')
      cy.get('div.chosen-search')
        .type(address)
        .then(list => {
          if(list.children().eq(address)){
            cy.get('li.active-result')
              .click()
          }
        })
    }

    completeBooking(){
      cy.get('button.btn.btn-success.btn-lg.btn-block.completebook')
        .click()
    }

}

export const bookPage = new BookPage()