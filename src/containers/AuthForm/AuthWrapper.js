import React, { Component } from 'react';

import { getLanguageKey } from './../../utils/commonFunc';

export default class AuthWrapper extends Component {
  render() {
    const { authType = 'login' } = this.props || {};
    const form = this.props.children ? this.props.children : null;
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 col-md-6 col-sm-12 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src={require("./../../assets/images/logo.svg")} alt="logo" />
                  </div>
                  <h4>{
                    getLanguageKey(`authForm.${authType}Title`)
                  }</h4>
                  <h6 className="font-weight-light">{
                    getLanguageKey(`authForm.${authType}Detail`)
                  }</h6>

                  {
                    form
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
