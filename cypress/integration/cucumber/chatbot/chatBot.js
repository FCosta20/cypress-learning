import{inChatBot} from "../support/page_objects/homePage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"

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

Given('I am on home page', () => {
    cy.visit('/')
})  

When('I start the chat with user info', () => {
    inChatBot.openChatBot()
    inChatBot.startChatBot(user.first_name,user.mobile_phone,user.email)
})

And('I send a message', () => {
    inChatBot.typeMessageInChat(sms.message)
})

Then('I close the chat', () => {
    inChatBot.closeChatBot()
})