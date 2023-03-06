import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../style/login.css';

class Login extends React.Component {
  state = {
    elementError: false,
    messageError: '',
    email: '',
    password: '',
    btnDisable: true,
  };

  constructor() {
    super();
    const verifyLoginLogout = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        if (user.role === 'seller') {
          window.location.assign('http://localhost:3000/seller/orders');
        } else if (user.role === 'customer') {
          window.location.assign('http://localhost:3000/customer/products');
        } else if (user.role === 'administrator') {
          window.location.assign('http://localhost:3000/admin/manage');
        }
      }
    };
    verifyLoginLogout();
  }

  typeEvent = ({ target }) => {
    const inputEvent = target.id;
    this.setState({ [inputEvent]: target.value }, this.enableDisableButton);
  };

  enableDisableButton = () => {
    const { email, password } = this.state;
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length >= SIX) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  postFunc = async (endpoint, body) => {
    const apiAxios = axios.create({ baseURL: 'http://localhost:3001' });
    const ERROR_NUMBER = 501;
    const { data } = await apiAxios
      .post(endpoint, body, { headers:
        { 'Content-Type': 'application/json' },
      validateStatus: (status) => status < ERROR_NUMBER });
    return data;
  };

  verifyLogin = async () => {
    const { email, password } = this.state;
    try {
      const data = await this.postFunc('/login', { email, password });
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'customer') {
          window.location.assign('http://localhost:3000/customer/products');
        } else if (data.role === 'seller') {
          window.location.assign('http://localhost:3000/seller/orders');
        } else if (data.role === 'administrator') {
          window.location.assign('http://localhost:3000/admin/manage');
        }
      } else {
        this.setState({ elementError: true, messageError: data.message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { elementError, email, password, btnDisable, messageError } = this.state;
    return (
      <div className="container-login">
        <h1>Tereza Drinks</h1>
        <form className="form-container">
          <p>Login</p>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ (e) => this.typeEvent(e) }
              className="input-login"
            />
          </label>
          <p>Senha</p>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ (e) => this.typeEvent(e) }
              className="input-login"
            />
          </label>
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ btnDisable }
            onClick={ this.verifyLogin }
            className="button-login"
          >
            Login
          </button>
          <Link to="/register" className="register-text">
            <button
              type="button"
              data-testid="common_login__button-register"
              className="button-login"
            >
              Ainda não tenho conta
            </button>
          </Link>
          { elementError === true
            ? (
              <p
                data-testid="common_login__element-invalid-email"
                className="error-message"
              >
                { messageError }
              </p>
            ) : '' }
        </form>
      </div>
    );
  }
}

export default Login;
