import { HTTP } from 'meteor/http'
import { Blaze } from 'meteor/blaze'
import { Template } from 'meteor/templating'

import Movies from '../../api/movies'

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
          
          // CORS request required - hacky :/
          var xhr = new XMLHttpRequest()
          xhr.open('GET', tfURL, true)
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              resolve(JSON.parse(xhr.response))
            }
          }
          xhr.send(null)
        }
        
        // Store the context to resend to Watson
        else {
          Session.set('conversationContext', result.ctx)
          resolve(result)
        }
      })).then((result) => {
        const movies = []
        if (result.movies && result.movies.length > 0) {
          for (let movie_query of result.movies) {
            const movie = Movies.findOne(movie_query)
            if (movie) movies.push(movie)
          }
        }
        pushBubble(parseResponse(result.txt), true, movies)
      })
    })
  }
  // Clear input field
  inputField.val('')
}


const parseResponse = (txt) => {
  if (txt === '')
    return 'Sorry, can you rephrase that?'
  return txt.replace(/_UNK/g, 'What').replace(/(?:What\s)+/g, 'What')
}


const pushBubble = (txt, isReply=false, movies=null) => {
  Blaze.renderWithData(Template['bubble'], {txt, isReply, movies},
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
