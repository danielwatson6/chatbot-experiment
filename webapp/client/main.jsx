import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import '/imports/ui/vendor/bootstrap/js'

import Layout from '../imports/ui/components/Layout.jsx'


Meteor.startup(() => {
  render(<Layout />, document.getElementById('render-target'))
})
