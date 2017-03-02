import React, { Component, PropTypes } from 'react'

export default class ErrorPage extends Component {
  
  render() {
    return (<div id="Error">
      
      <h1 className="error-head">{this.props.error}</h1>
      <p className="lead">Aw, snap! That's an error.</p>
     
    </div>)
  }
}

ErrorPage.propTypes = {
  error: PropTypes.string.isRequired,
}
