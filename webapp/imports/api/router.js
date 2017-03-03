import { Router } from 'meteor/iron:router'

import nlp from './nlp'


Router.configure({
  notFoundTemplate: 'notFound'
})

Router.route('/nlp', function () {
  const req = this.request
  const res = this.response
  res.writeHead(200, {'Content-Type': 'application/json'})
  nlp(req.query.txt, req.query.ctx).then((result) => {
    res.end(JSON.stringify(result))
  })
}, {where: 'server'})

Router.route('/', function () {
  this.render('main')
})
