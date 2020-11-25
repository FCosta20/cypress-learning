const { chatBot } = require("../support/page_objects/chatBot");

describe('Chat bot test', () => {

    let data = {}

    before (() => {
        cy.fixture('chatBotInfo').then((chatBotInfo) => {
            data = chatBotInfo;
        })
    })

    beforeEach('Open PHPTravels', () => {
        cy.visit('/')
        chatBot.loadChatBot()
    })

    it('Open chat bot', () => {
        chatBot.startChatWithBot(data.name, data.phone, data.email)
    })
})