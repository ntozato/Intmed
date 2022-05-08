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
  const emailRegex = /\S+@\S+\.\S+/;
  const isEmailValid = emailRegex.test(email);
  const isNameValid = name.length >= 6;
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = password === confirmPassword;
  const isButtonDisabled = !(isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);

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
          <input onChange={({target}) => setName(target.value)} className={!isNameValid && name !== "" ? "name-input-ca-error" : "name-input-ca"} type="text" placeholder="Nome" />
          {!isNameValid && (name !== "") && <p className="error-title">Nome deve ter no mínimo 6 caracteres.</p>}
          <input onChange={({target}) => setEmail(target.value)} className={!isEmailValid && email !== "" ? "email-input-ca-error": "email-input-ca"} type="text" placeholder="Email"/>
          {!isEmailValid && (email !== "") && <p className="error-title">Email deve ter um formato válido.</p>}
          <div className="password-input-div-ca">
            <input onChange={({target}) => setPassword(target.value)} className="password-input-ca" type={typePassword} placeholder="Senha" />
            <button onClick={() => changePasswordType()} type="button" className="eye-button">
              <img src={eye} alt="eye" className="eye" />
            </button>
          </div>
          {!isPasswordValid && (password !== "") && <p className="error-title">Senha deve ter no mínimo 6 caracteres.</p>}
          <div className={!isPasswordValid && password !== "" ? "confirm-password-input-div-error" : "confirm-password-input-div"}>
            <input onChange={({target}) => setConfirmPassword(target.value)} className="confirm-password-input" type={confirmPasswordType} placeholder="Confirmar Senha" />
            <button onClick={() => changeConfirmPasswordType()} type="button" className="eye-button-ca">
              <img src={eye} alt="eye" className="eye-ca" />
            </button>
          </div>
          {!isConfirmPasswordValid && confirmPassword !== "" && <p className="error-title">Senhas não correspondem.</p>}
        </div>
        <div className={!isConfirmPasswordValid && confirmPassword !== "" ? "buttons-ca-password-error" : "buttons-ca"}>
          <button type="button" className="create-btn-ca" onClick={() => history.push("/")}><b>Cancelar</b></button>
          <button disabled={isButtonDisabled} type="button" className={isButtonDisabled ? "access-btn-ca-disabled" : "access-btn-ca"} onClick={() => handleSubmit()}><b>Confirmar</b></button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
