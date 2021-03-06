import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../src/intmed-logo.png';
import eye from '../../src/vector.svg';
import api from '../api/index';
import ModalLogin from '../components/ModalLogin/ModalLogin';
import './style.css';

function Login() {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const showPassword = () => {
    if (passwordInputType === "password") {
      setPasswordInputType("text");
    } else {
      setPasswordInputType("password")
    }
  }

  const handleLogin = (target) => {
    if (target.name === "email") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    };
  };

  const handleSubmit = async (e) => {

    try {
      const user = {
        username,
        password
      };
      const data = await api.post('/users/login', user);
      if(data.data.token) {
        localStorage.setItem('token', `${JSON.stringify(data.data.token)}`);
        history.push("/home");
      }
    } catch (e) {
      setOpenModal(true);
    }
  }

  return (
    <div className='content'>
      {openModal && <ModalLogin loginModal={setOpenModal} />}
    <div className="login-content">
        <div className="logo">
          <img src={logo} alt="logo" className="logo-box"/>
          <h1>Medicar</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <input
            onChange={({target}) => handleLogin(target)}
            name="email"
            className="email-input"
            type="text"
            placeholder="Email ou Login"
            />
            <div className="eye-input-div-login">
              <input
              onChange={({target}) => handleLogin(target)}
              className="password-input"
              type={passwordInputType}
              placeholder="Senha" />
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
            <button
            type="button"
            className="create-btn"
            onClick={() => history.push("/create-account")}
            >
              <b>Criar conta</b>
            </button>
            <button
            type="button"
            onClick={() => handleSubmit()}
            className="access-btn"
            >
              <b>Acessar</b>
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default Login;