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
      (new Promise((resolve, reject) => {
        const result = JSON.parse(res.content)
        
        // If Watson cannot handle the message, use the deep learning API
        if (result.err) {
          const tfURL = 'http://127.0.0.1:5000/?txt=' + encodeURIComponent(txt)
          
          // CORS request required - hacky
          var xhr = new XMLHttpRequest()
          xhr.open('GET', tfURL, true)
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              resolve(JSON.parse(xhr.response).txt)
            }
          }
          xhr.send(null)
        }
        
        // Store the context to resend to Watson
        else {
          Session.set('conversationContext', result.ctx)
          reslove(result.txt)
        }
      })).then((txt) => {
        pushBubble(txt, true)
      })
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
