import React, { useEffect, useState } from 'react';
import api from '../api/index';
import './Modal.css';

function Modal({ closeModal }) {
  const [especialidades, setEspecialidades] = useState('');
  const [medicos, setMedicos] = useState('');

  const fetchEspecialidades = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await api.getEspecialidades(token);

    if (response) {
      const { data } = response;
      setEspecialidades(data);
      console.log(data);
    };
  }

  const fetchMedicos = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await api.getMedicos(token);

    if (response) {
      const { data } = response;
      setMedicos(data);
      console.log(data);
    };
  }

  const renderEspecialidades = () => {
    if (especialidades) {
      return especialidades.map((e, index) => {
        return <option key={index}>{e.nome}</option>
      });
    };
  };

  const renderMedicos = () => {
    if (medicos) {
      return medicos.map((e, index) => {
        return <option key={index}>{e.nome}</option>
      });
    };
  };

  useEffect(() => {
    fetchEspecialidades();
    fetchMedicos();
  }, []);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title">
          <h3>Nova Consulta</h3>
        </div>
        <div className="inputs">
          <select>
            {renderEspecialidades()}
          </select>
          <select>
            {renderMedicos()}
          </select>
          <select>
            <option>teste</option>
            <option>teste</option>
          </select>
          <select>
            <option>teste</option>
            <option>teste</option>
          </select>
        </div>
        <div className='buttons'>
          <button type="button" className='cancel-btn' onClick={() => closeModal(false)}>Cancelar</button>
          <button type="button" className='confirm-btn'>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
