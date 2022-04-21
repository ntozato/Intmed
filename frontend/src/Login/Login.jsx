import React from 'react';
import logo from '../../src/intmed-logo.png';
import eye from '../../src/vector.svg';
import './style.css';

function Login() {
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="logo" className="logo-box"/>
        <h1>Medicar</h1>
      </div>
      <form>
        <div className="inputs">
          <input className="email-input" type="text" placeholder="Email ou Login" />
          <div className="eye-input-div">
            <input className="password-input" type="password" placeholder="Senha" />
            <button className="eye-button">
              <img src={eye} alt="eye" className="eye" />
            </button>
          </div>
        </div>
        <div className="remember-password-checkbox">
          <input type="checkbox" />
          <p className="remember-password-text">Lembrar minha senha</p>
        </div>
        <div className="buttons">
          <button className="create-btn"><b>Criar conta</b></button>
          <button className="access-btn"><b>Acessar</b></button>
        </div>
      </form>

    </div>
  );
}

export default Login;