import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function ModalLogin({loginModal}) {
  return(
    <div className='alert-container'>
      <div className="alert">
        <p className='title'>Dados inválidos</p>
        <div>
          <button className="back-btn" onClick={() => loginModal(false)}>Voltar</button>
        </div>
      </div>
    </div>
  )
}

ModalLogin.propTypes = {
  loginModal: PropTypes.func.isRequired,
}

export default ModalLogin;