import{inChatBot} from "../../../support/page_objects/homePage.js"
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import {first_name, mobile_phone, email} from "../../../fixtures/register.json"
import {message} from "../../../fixtures/message.json"

Given('I am on home page', () => {
    cy.visit('/')
})  

When('I start the chat with user info', () => {
    inChatBot.openChatBot()
    inChatBot.startChatBot(first_name, mobile_phone, email)
})

And('I send a message', () => {
    inChatBot.typeMessageInChat(message)
})

Then('I close the chat', () => {
    inChatBot.closeChatBot()
})