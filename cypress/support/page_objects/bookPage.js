
class BookPage{

    fillBooking(name, age, passportNo){
        cy.get('#passenger_name_0')
          .click({force:true})
          .type(name)
        
        cy.get('#passenger_age_0')
          .click({force:true})
          .type(age)
        
         cy.get('#passenger_passport_0')
           .click({force:true})
           .type(passportNo) 
        
        cy.get('button.btn.btn-success.btn-lg.btn-block.completebook')
          .click()
    }

}

export const bookPage = new BookPage()