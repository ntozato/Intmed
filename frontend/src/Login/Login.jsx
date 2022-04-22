import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../src/intmed-logo.png';
import eye from '../../src/vector.svg';
import './style.css';

function Login() {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const history = useHistory();

  const showPassword = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password")
    }
  }

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
            <input className="password-input" type={passwordInputType} placeholder="Senha" />
            <button type="button" className="eye-button" onClick={() => showPassword()}>
              <img src={eye} alt="eye" className="eye" />
            </button>
          </div>
        </div>
        <div className="remember-password-checkbox">
          <input type="checkbox" />
          <p className="remember-password-text">Lembrar minha senha</p>
        </div>
        <div className="buttons">
          <button className="create-btn" onClick={() => history.push("/create-account")}><b>Criar conta</b></button>
          <button className="access-btn" onClick={() => history.push("/home")}><b>Acessar</b></button>
        </div>
      </form>

    </div>
  );
}

export default Login;