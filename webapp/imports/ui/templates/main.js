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
    HTTP.call('GET', '/nlp', {params: {txt} }, (err, res) => {
      pushBubble(res.content, true)
    })
  }
  inputField.val('')
}

const pushBubble = (txt, isReply=false) => {
  Blaze.renderWithData(Template['bubble'], {txt, isReply},
    document.getElementById('bubbles'))
}

Template.main.events({
  
  'click #user-input-btn': handleUserInput,
  
  'keypress #user-input'(event) {
    // Check for return/enter key
    if (event.which === 13)
      handleUserInput(event)
  },
})
