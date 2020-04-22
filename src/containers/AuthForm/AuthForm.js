import React, { Component } from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

import AuthWrapper from './AuthWrapper';
import InputForm from './../../components/InputForm/InputForm';
import Validator from './../../components/Validator/Validator';

import { countries } from './../../constants/constants';

import { getLanguageKey } from './../../utils/commonFunc';

import { login } from './../../actions/authActions';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      data: {
        userName: '',
        email: 'admin',
        password: 'admin',
        countryCode: '',
        isRemember: false,
        isAgree: false
      },
      valid: {}
    }
  }

  handleLogin = () => {
    const {
      data: {
        email,
        password
      } = {}
    } = this.state || {};

    const loginAction = login(email, password);

    loginAction
      .then(response => {
        const { data } = response || {};
        if (!data) return;
        localStorage.setItem('jwtToken', data.token);
        this.props.history.push('/')
      })
      .catch(error => console.log(error))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isSubmitted: true
    })
    const { authType = 'login' } = this.props || {};

    switch (authType) {
      case 'login':
        return this.handleLogin();
      default:
        return this.setState({
          isSubmitted: false
        });
    }
  }

  validationCallback = (id, valid) => {
    if (this.state.valid[id] !== valid) {
      this.setState({
        valid: {
          ...this.state.valid,
          [id]: valid
        }
      })
    }
  }

  handleChangeInput = (key, e, isCheckbox = false) => {
    const value = isCheckbox ? e.target.checked : e.target.value;
    this.setState({
      data: {
        ...this.state.data,
        [key]: value
      }
    });
  }

  render() {
    const { authType = 'login' } = this.props || {};
    const linkToRedirect = authType === 'login' ? '/register' : '/login';

    const {
      isSubmitted,
      data: {
        userName = '',
        email = '',
        password = '',
        countryCode = '',
        isRemember = false,
        isAgree = false
      },
      valid
    } = this.state;

    return (
      <AuthWrapper {...this.props}>
        <form onSubmit={this.handleSubmit} className="pt-3 auth-form">
          {
            authType === 'register' ? <div className="form-group">
              <InputForm
                type="text"
                className="form-control form-control-lg"
                id="userName"
                placeholder={getLanguageKey('authForm.userName')}
                value={userName}
                autoFocus={true}
                onChange={(e) => this.handleChangeInput('userName', e)}
              />
              <Validator
                validType={[
                  {
                    type: 'isRequired',
                    message: 'authForm.userNameIsRequired'
                  }
                ]}
                value={userName}
                validationCallback={this.validationCallback}
                disabled={!isSubmitted}
                hideMessage={valid.userName}
                id="userName"
              />
            </div>
              : null
          }

          <div
            className="form-group">
            <InputForm
              type="text"
              className="form-control form-control-lg"
              id="email"
              placeholder={getLanguageKey(`authForm.${authType === 'login' ? 'userName' : 'email'}`)}
              value={email}
              autoFocus={authType === 'login' ? true : false}
              onChange={(e) => this.handleChangeInput('email', e)}
            />
            <Validator
              validType={[
                {
                  type: 'isRequired',
                  message: 'authForm.emailIsRequired'
                },
                authType === 'register' ? {
                  type: 'isValidEmail',
                  message: 'authForm.emailIsInvalid'
                } : {}
              ]}
              validationCallback={this.validationCallback}
              disabled={!isSubmitted}
              value={email}
              hideMessage={valid.email}
              id="email"
            />
          </div>

          {
            authType === 'register' && <div
              className="form-group"
            >
              <select
                value={countryCode}
                onChange={(e) => this.handleChangeInput('countryCode', e)}
                className="form-control form-control-lg"
                id="countryCode"
              >
                <option value="" disabled>{getLanguageKey('authForm.country')}</option>
                {
                  (countries || []).map((country, index) => (
                    <option key={index} value={country.code}>{country.name}</option>
                  ))
                }
              </select>
              <Validator
                validType={[
                  {
                    type: 'isRequired',
                    message: 'authForm.countryIsRequired'
                  }
                ]}
                validationCallback={this.validationCallback}
                disabled={!isSubmitted}
                value={countryCode}
                hideMessage={valid.countryCode}
                id="countryCode"
              />
            </div>
          }

          <div
            className="form-group"
          >
            <InputForm
              type="password"
              className="form-control form-control-lg"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => this.handleChangeInput('password', e)}
            />
            <Validator
              validType={[
                {
                  type: 'isRequired',
                  message: 'authForm.passwordIsRequired'
                }
              ]}
              validationCallback={this.validationCallback}
              value={password}
              disabled={!isSubmitted}
              hideMessage={valid.password}
              id="password"
            />
          </div>

          {
            authType === 'register' && <div
              className="mb-4"
            >
              <div className="form-check">
                <label htmlFor="agreeCheck" className="form-check-label text-muted">
                  <InputForm
                    type="checkbox"
                    className="form-check-input"
                    checked={isAgree}
                    id="agreeCheck"
                    onChange={(e) => this.handleChangeInput('isAgree', e, true)}
                  />
                  {getLanguageKey('authForm.agree')}
                  <i className="input-helper"></i>
                </label>
              </div>
            </div>
          }

          <div
            className="mt-3"
          >
            <button
              type="submit"
              disabled={authType === 'register' && !isAgree}
              className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn text-uppercase"
            >{
                getLanguageKey(`authForm.${authType}`)
              }</button>
          </div>

          {
            authType === 'login' && <div
              className="my-2 d-flex justify-content-between align-items-center"
            >
              <div
                className="form-check"
              >
                <label
                  htmlFor="rememberCheck"
                  className="form-check-label text-muted"
                >
                  <InputForm
                    type="checkbox"
                    className="form-check-input"
                    id="rememberCheck"
                    checked={isRemember}
                    onChange={(e) => this.handleChangeInput('isRemember', e, true)}
                  />
                  {getLanguageKey('authForm.loginRemember')}
                  <i className="input-helper"></i>
                </label>
              </div>
              <Link
                to="/login"
                className="auth-link text-black"
              >
                {getLanguageKey('authForm.forgotPassword')}
              </Link>
            </div>
          }

          <div
            className="text-center mt-4 font-weight-light"
          >
            {getLanguageKey(`authForm.${authType === 'login' ? 'dontHaveAccount' : 'alreadyAccount'}`)} <Link
              to={linkToRedirect}
              className="text-primary"
            >
              {
                getLanguageKey(`authForm.${authType}RedirectFrom`)
              }
            </Link>
          </div>
        </form>
      </AuthWrapper>
    )
  }
}

export default withRouter(AuthForm);