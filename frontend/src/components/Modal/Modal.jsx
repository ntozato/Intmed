import React, { useEffect, useState } from 'react';
import api from '../../api/index';
import './Modal.css';

function Modal({ closeModal }) {
  const [especialidades, setEspecialidades] = useState('');
  const [especialidadeOption, setEspecialidadeOption] = useState('');
  const [medicos, setMedicos] = useState('');
  const [selectedMedico, setSelectedMedico] = useState('');
  const [horarios, setHorarios] = useState('');
  const [datas, setDatas] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedHorario, setSelectedHorario] = useState("");
  const [isMedicoInputDisabled, setIsMedicoInputDisabled] = useState(true);
  const [isDataInputDisabled, setIsDataInputDisabled] = useState(true);
  const [isHorarioInputDisabled, setIsHorarioInputDisabled] = useState(true);
  const [agendaId, setAgendaId] = useState('');
  const isConfirmBtnDisabled = !(
    especialidadeOption 
    && selectedMedico 
    && selectedData 
    && selectedHorario);
  
  const fetchEspecialidades = async () => {
    const response = await api.get('/especialidades');

    if (response) {
      const { data } = response;
      setEspecialidades(data);
    };
  }

  const fetchMedicos = async () => {
    const response = await api.get('/medicos');

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
      const med = medicos.filter((m) => m.especialidade.nome === especialidadeOption).map((e, index) => {
        return <option key={index}>{e.nome}</option>
      });
      if (med[0]) {
        return med;
      } else {
        return <option disabled={true}>Não há médicos disponíveis</option>
      }
    }
  }

  const fetchAgendas = async (selectedMedico) => {
    const response = await api.get('/agendas');

    if (response) {
      const { data } = response;
      const id = data.filter((e) => e.medico.nome === selectedMedico)[0]?.id;
      setAgendaId(id);
      const horario = data.filter((e) => e.medico.nome === selectedMedico)[0]?.horarios;
      const dias = data.filter((e) => e.medico.nome === selectedMedico)[0]?.dia;
      setDatas(dias);
      setHorarios(horario);
    };
  };

  const renderData = () => {
    if (datas) {
      const formattedDate = datas.split("-").reverse().join("/");
      return <option>{formattedDate}</option>
    }
    if (!datas) {
      return (
        <>
          <option hidden>Data</option>
          <option disabled={true}>Não há datas disponíveis</option>
        </>
      );
    }
  }

  const renderHorarios = () => {
    if (horarios) {
      return horarios.map((horario, index) => {
        return <option key={index}>{horario}</option>
      });
    } else {
      return <option disabled={true}>Não há horários disponíveis</option>
    }
  }

  const postConsulta = async () => {
    await api.post('/consultas', {agenda_id: agendaId, horario: selectedHorario});
    closeModal(false);
  }

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    setSelectedMedico('');
    setDatas('');
    setSelectedHorario('');
    setHorarios('');
    setSelectedData('');
    setIsHorarioInputDisabled(true);
    setIsDataInputDisabled(true);
    fetchMedicos();
  }, [especialidadeOption]);

  useEffect(() => {
    setSelectedData('');
    setSelectedHorario('');
    setHorarios('');
    setDatas('');
    fetchAgendas(selectedMedico);
  }, [selectedMedico]);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title">
          <h3>Nova Consulta</h3>
        </div>
        <div className="inputs">
          <select onChange={({target}) => {setEspecialidadeOption(target.value); setIsMedicoInputDisabled(false)}}>
            <option hidden>Especialidade</option>
            {renderEspecialidades()}
          </select>
          <select disabled={isMedicoInputDisabled} onChange={({target}) => {setSelectedMedico(target.value); setIsDataInputDisabled(false)}}>
            <option hidden>Médico</option>
            {renderMedicos()}
          </select>
          <select disabled={isDataInputDisabled} onChange={({target}) => {setSelectedData(target.value); setIsHorarioInputDisabled(false)}}>
            <option hidden>Data</option>
            {renderData()}
          </select>
          <select disabled={isHorarioInputDisabled} onChange={({target}) => setSelectedHorario(target.value)}>
            <option hidden>Horário</option>
            {renderHorarios()}
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
