import ConversationV1 from 'watson-developer-cloud/conversation/v1'
import nlp from 'compromise'

const conversation = new ConversationV1({
  username: '6e7acaed-0dcc-4ab8-a825-f574e481fa20',
  password: '0T3TRDe2UPMt',
  path: {workspace_id: '2e5e0178-9054-4c76-b47f-de865fa7b9a7'},
  version_date: '2017-03-03'
})

export default (text) => {
  return new Promise((resolve, reject) => {
    conversation.message({ input: {text} }, (err, response) => {
      resolve(response.output.text[0])
    })
  })
}
