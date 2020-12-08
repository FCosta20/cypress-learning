const { chatBot } = require("../support/page_objects/chatBot");

describe('Chat bot test', () => {

    //variable for using data from fixtures
    let data = {}

    //take data from personalInfo fixture
    before (() => {
        cy.fixture('personalInfo').then((personalInfo) => {
            data = personalInfo;
        })
    })

    //open PHPTravels and load chatbot iframe
    beforeEach('Open PHPTravels', () => {
        cy.visit('/')
        chatBot.loadChatBot()
    })

    it('Open chat bot', () => {
        chatBot.startChatWithBot(data.name, data.phone, data.email)
        chatBot.closeChatBot()
    })

})