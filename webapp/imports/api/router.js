import { Router } from 'meteor/iron:router'

import nlp from './nlp'


Router.configure({
  notFoundTemplate: 'notFound'
})

Router.route('/nlp', function () {
  const res = this.response
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end(nlp(this.request.query.txt))
}, {where: 'server'})

Router.route('/', function () {
  this.render('main')
})
