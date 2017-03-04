import { HTTP } from 'meteor/http'

import ConversationV1 from 'watson-developer-cloud/conversation/v1'
import nlp from 'compromise'

import Movies from './movies'


const conversation = new ConversationV1({
  username: 'a60c5f60-78be-4168-bbb1-998b15112716',
  password: '1k7mbstKiuHo',
  path: {workspace_id: '9925a347-b5d6-4bf0-b6be-3d45211ccc47'},
  version_date: '2017-03-04'
})

export default (text, context) => {
  return new Promise((resolve, reject) => {
    const messageParams = { input: {text} }
    
    // AJAX stringifies undefined contexts
    if (context && context !== 'undefined')
      messageParams['context'] = context
    
    // Use IBM Watson to find potential intents and entities
    conversation.message(messageParams, (err, response) => {
      
      // Entity matches should be searched for in Mongo database
      if (response.entities.length > 0) {
        const txt = response.output.text[0]
        
        const movies = []
        for (match of response.entities) {
          if (movies.length >= 3) break
          const movie = {}
          movie[match.entity] = match.value
          movies.push(movie)
        }
        
        resolve({txt, ctx: response.context, movies})
      }
      
      // Intent matches should be handled by IBM Watson Conversation
      else if (response.intents.length > 0) {
        const txt = response.output.text[0]
        resolve({txt, ctx: response.context})
      }
      
      // Delegate to generative model when no intent is found
      else {
        resolve({err: 'Try generative model'})
      }
    })
  })
}
