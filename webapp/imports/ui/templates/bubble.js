import { Template } from 'meteor/templating'

import './bubble.tpl.jade'


Template.bubble.onRendered(function () {
  // Add styling for bubble position
  if (this.data['isReply']) {
    this.$('.content').addClass('reply')
  }
  else {
    this.$('.content').addClass('offset-xs-6')
    this.$('.filler').addClass('pull-xs-6')
  }
})

Template.bubble.helpers({
  moviesFound() {
    return this.movies.length > 0
  },
  renderMovies() {
    return JSON.stringify(this.movies)
  },
})

