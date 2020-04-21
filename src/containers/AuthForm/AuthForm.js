import React, { Component } from 'react'

export default class AuthForm extends Component {
  render() {
    const { authType = 'login' } = this.props || {};
    return (
      <div>
        {authType}
      </div>
    )
  }
}
