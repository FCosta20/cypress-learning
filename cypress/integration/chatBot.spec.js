import{inChatBot} from "../support/page_objects/homePage.js"


describe('chatbot suite', ()=>{

    let user = {}
    let sms = {}

    before(() => {

        cy.fixture('register').then(register=> {
            user = register;
          });

        cy.fixture('message').then(message=> {
            sms = message;
          });

      });

    beforeEach('open site', () => {
        cy.visit('/')
    })


    it('chatbot test',()=>{
        inChatBot.openChatBot()
        inChatBot.startChatBot(user.first_name,user.mobile_phone,user.email)
        inChatBot.typeMessageInChat(sms.message)
       
    })
})