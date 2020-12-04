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

    // 
    it('INTERACT WITH THE CHATBOT',()=>{
        // find the chat button and click on it
        inChatBot.openChatBot()
        // fill in the proposal field - user's name, phone numder and email 
        inChatBot.startChatBot(user.first_name,user.mobile_phone,user.email)
        // type the message in the  chat
        inChatBot.typeMessageInChat(sms.message)
        // close the chat after sending a message
        inChatBot.closeChatBot()
       
    })
})