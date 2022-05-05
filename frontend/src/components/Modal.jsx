import React, { useEffect, useState } from 'react';
import api from '../api/index';
import './Modal.css';

function Modal({ closeModal }) {
  const [especialidades, setEspecialidades] = useState('');
  const [especialidadeOption, setEspecialidadeOption] = useState('');
  const [medicos, setMedicos] = useState('');
  const [selectedMedico, setSelectedMedico] = useState('');
  // const [agendas, setAgendas] = useState('');
  const [horarios, setHorarios] = useState('');
  const [datas, setDatas] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedHorario, setSelectedHorario] = useState("");
  const isConfirmBtnDisabled = !(especialidadeOption && selectedMedico && selectedData && selectedHorario);

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
      return medicos.filter((m) => m.especialidade.nome === especialidadeOption).map((e, index) => {
        return <option key={index}>{e.nome}</option>
      });
    };
  };

  const fetchAgendas = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await api.getAgendas(token);

    if (response) {
      const { data } = response;
      const horario = data.filter((e) => e.medico.nome === selectedMedico)[0].horarios;
      const dias = data.filter((e) => e.medico.nome === selectedMedico)[0].dia;
      setDatas(dias);
      setHorarios(horario);
      console.log(dias);
      console.log(horario);
    };
  };

  const renderData = () => {
    if (datas) {
      const formattedDate = datas.split("-").reverse().join("/");
      return <option>{formattedDate}</option>
    }
  }

  const renderHorarios = () => {
    if (horarios) {
      return horarios.map((horario, index) => {
        return <option key={index}>{horario}</option>
      })
    }
  }

  const postConsulta = async () => {
    const token = await JSON.parse(localStorage.getItem('token'));
    await api.postConsultas(token);
    closeModal(false);
  }

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    fetchMedicos();
  }, [especialidadeOption]);

  useEffect(() => {
    setHorarios('');
    setDatas('');
    fetchAgendas();
  }, [selectedMedico]);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title">
          <h3>Nova Consulta</h3>
        </div>
        <div className="inputs">
          <select onChange={({target}) => setEspecialidadeOption(target.value)}>
            <option disabled selected hidden>Especialidade</option>
            {renderEspecialidades()}
          </select>
          <select onChange={({target}) => setSelectedMedico(target.value)}>
            <option disabled selected hidden>Médico</option>
            {renderMedicos()}
          </select>
          <select onChange={({target}) => setSelectedData(target.value)}>
            <option disabled selected hidden>Data</option>
            {datas && renderData()}
          </select>
          <select onChange={({target}) => setSelectedHorario(target.value)}>
            <option disabled selected hidden>Horário</option>
            {horarios && renderHorarios()}
          </select>
        </div>
        <div className='buttons'>
          <button type="button" className='cancel-btn' onClick={() => closeModal(false)}>Cancelar</button>
          <button disabled={isConfirmBtnDisabled} onClick={() => postConsulta()} type="button" className={isConfirmBtnDisabled ? 'confirm-btn-disabled' : 'confirm-btn'}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
