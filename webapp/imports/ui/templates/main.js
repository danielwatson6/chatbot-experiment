import { HTTP } from 'meteor/http'
import { Blaze } from 'meteor/blaze'
import { Template } from 'meteor/templating'

import './main.tpl.jade'


const handleUserInput = () => {
  event.preventDefault()
  const inputField = $('#user-input')
  const txt = inputField.val()
  if (txt) {
    pushBubble(txt)
    const ctx = Session.get('conversationContext')
    HTTP.call('GET', '/nlp', {params: {txt, ctx} }, (err, res) => {
      const result = JSON.parse(res.content)
      Session.set('conversationContext', result.context)
      pushBubble(result.output.text[0], true)
    })
  }
  // Clear input field
  inputField.val('')
}

const pushBubble = (txt, isReply=false) => {
  Blaze.renderWithData(Template['bubble'], {txt, isReply},
    document.getElementById('bubbles'))
  // Scroll to bottom of the page
  window.scrollTo(0, document.body.scrollHeight)
}

Template.main.events({
  
  'click #user-input-btn': handleUserInput,
  
  'keypress #user-input'(event) {
    // Check for return/enter key
    if (event.which === 13)
      handleUserInput(event)
  },
})
