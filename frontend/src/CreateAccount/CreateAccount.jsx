import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from '../api/index';
import logo from '../../src/intmed-logo.png';
import eye from '../../src/vector.svg';
import './style.css';

function CreateAccount() {
  const history = useHistory();
  const [typePassword, setTypePassword] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changePasswordType = () => {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    };
  };

  const changeConfirmPasswordType = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    };
  };

  const handleSubmit = async () => {
    const user = {
      name,
      email,
      password
    }

    await api.post('/users', user);
    localStorage.setItem('token', JSON.stringify("9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"));
    history.push("/home");
  }


  return (
    <div>
      <div className="logo-ca">
        <img src={logo} alt="logo" className="logo-box-ca"/>
        <h1>Medicar</h1>
      </div>
      <div className="create-account">
        <h3>Crie sua conta</h3>
      </div>
      <form>
        <div className="inputs-ca">
          <input onChange={({target}) => setName(target.value)} className="name-input-ca" type="text" placeholder="Nome" />
          <input onChange={({target}) => setEmail(target.value)} className="email-input-ca" type="text" placeholder="Email" />
          <div className="password-input-div-ca">
            <input onChange={({target}) => setPassword(target.value)} className="password-input-ca" type={typePassword} placeholder="Senha" />
            <button onClick={() => changePasswordType()} type="button" className="eye-button">
              <img src={eye} alt="eye" className="eye" />
            </button>
          </div>
          <div className="confirm-password-input-div">
            <input onChange={({target}) => setConfirmPassword(target.value)} className="confirm-password-input" type={confirmPassword} placeholder="Confirmar Senha" />
            <button onClick={() => changeConfirmPasswordType()} type="button" className="eye-button-ca">
              <img src={eye} alt="eye" className="eye-ca" />
            </button>
          </div>
        </div>
        <div className="buttons-ca">
          <button type="button" className="create-btn-ca" onClick={() => history.push("/")}><b>Cancelar</b></button>
          <button type="button" className="access-btn-ca" onClick={() => handleSubmit()}><b>Confirmar</b></button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
