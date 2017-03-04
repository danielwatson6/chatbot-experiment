import { HTTP } from 'meteor/http'

import ConversationV1 from 'watson-developer-cloud/conversation/v1'
import nlp from 'compromise'


const conversation = new ConversationV1({
  username: 'a60c5f60-78be-4168-bbb1-998b15112716',
  password: '1k7mbstKiuHo',
  path: {workspace_id: 'a901f223-8d41-409f-ad2f-dc77723dc158'},
  version_date: '2017-03-04'
})

export default (text, context) => {
  return new Promise((resolve, reject) => {
    
    const tfURL = 'http://127.0.0.1:5000/'
    const res = HTTP.get(tfURL, {params: {txt: text}})
    
    console.log(res)
    
    const messageParams = { input: {text} }
    
    // AJAX stringifies undefined contexts
    if (context && context !== 'undefined')
      messageParams['context'] = context
    
    // Use IBM Watson to find potential intents and entities
    conversation.message(messageParams, (err, response) => {
      
      // Entities are sometimes matched without any intent
      if (response.entities.length > 0) {
        
      }
      else if (response.intents.length > 0) {
        const txt = response.output.text[0]
        
        const intent = response.intents[0].intent
        switch (intent) {
          case 'director':
            break
          case 'actor':
            break
          case 'movie':
            break
        }
        
        resolve({txt, ctx: response.context})
      }
      
      // Delegate to generative model when no intent is found
      else {
        resolve({err: 'Try generative model'})
      }
    })
  })
}
