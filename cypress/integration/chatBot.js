const { chatBot } = require("../support/page_objects/chatBot");

describe('Chat bot test', () => {

    //variable for using data from fixtures
    let data = {}

    //take data from chatBotInfo fixture
    before (() => {
        cy.fixture('chatBotInfo').then((chatBotInfo) => {
            data = chatBotInfo;
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