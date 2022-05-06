import React from 'react';
import './style.css';

function ModalLogin({loginModal}) {
  return(
    <div className='remove-alert-container'>
      <div className="remove-alert">
        <p className='title'>Dados inválidos</p>
        <div className="alert-buttons">
          <button className="yes-btn" onClick={() => loginModal(false)}>Voltar</button>
        </div>
      </div>
    </div>
  )
}

export default ModalLogin;