import React from 'react';
import { Navigate } from 'react-router-dom';
import { postData } from '../services/requests';
import '../style/register.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  error: '',
  isDisabled: true,
  redirect: false,
};

class Register extends React.Component {
  state = INITIAL_STATE;

  componentDidUpdate() {
    this.validateInfo();
  }

  handleClick = () => {
    const { name, email, password } = this.state;
    const body = { name, email, password };
    postData('/register', body)
      .then(() => { this.setState({ redirect: true }); })
      .catch((error) => this.setState({ error }));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateInfo = () => {
    const { name, email, password, isDisabled } = this.state;
    const emailRules = /\S+@\S+\.\S+/i;
    const passwordRules = 5;
    const nameRules = 11;
    const test = emailRules.test(email) && password.length > passwordRules
    && name.length > nameRules;

    if (test && isDisabled) {
      return this.setState({ isDisabled: false });
    }
    if (!test && !isDisabled) return this.setState({ isDisabled: true });
  };

  render() {
    const { name, email, password, error, isDisabled, redirect } = this.state;
    if (redirect) { return <Navigate to="/customer/products" />; }
    return (
      <section className="container-register">
        <h1>Cadastro</h1>
        <form className="form-container">
          <p>Nome</p>
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              value={ name }
              placeholder="Seu nome"
              onChange={ this.handleChange }
              data-testid="common_register__input-name"
              className="input-register"
            />
          </label>
          <p>Email</p>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              value={ email }
              placeholder="seu-email@site.com.br"
              onChange={ this.handleChange }
              data-testid="common_register__input-email"
              className="input-register"
            />
          </label>
          <p>Senha</p>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              value={ password }
              minLength="6"
              placeholder="No mínimo 6 caracteres"
              onChange={ this.handleChange }
              data-testid="common_register__input-password"
              className="input-register"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            data-testid="common_register__button-register"
            onClick={ this.handleClick }
            className="button-register"
          >
            CADASTRAR
          </button>
        </form>
        {
          error
            && (
              <p
                data-testid="common_register__element-invalid_register"
                className="error-message"
              >
                Usuário já cadastrado!
              </p>)
        }
      </section>
    );
  }
}

export default Register;
