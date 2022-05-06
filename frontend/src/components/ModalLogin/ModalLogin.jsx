import React from 'react';
import './style.css';

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

export default ModalLogin;