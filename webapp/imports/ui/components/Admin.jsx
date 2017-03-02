import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { FlowRouer } from 'meteor/kadira:flow-router'

import AccountsUIWrapper from './AccountsUIWrapper.jsx'


class Admin extends Component {
  
  render() {
    if (this.props.currentUser) {
      FlowRouter.redirect('/')
    }
    return (
      <div className="pull-right">
        <AccountsUIWrapper />
      </div>
    )
  }
}

Admin.propTypes = {
  currentUser: PropTypes.object,
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  }
}, Admin)
