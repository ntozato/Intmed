import React, { useEffect, useState } from "react";
import api from '../api/index';
import logo from '../../src/intmed-logo.png';
import vector from '../../src/mais-vector.svg';
import xvector from '../../src/xvector.svg';
import './style.css';

function Home() {
  const [consultas, setConsultas] = useState();

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await api.getConsultas(token);

    if (response) {
      const { data } = response;
      setConsultas(data);
    };
  };

  const renderData = () => {
    if (consultas) {
      return consultas.map((consulta) => {
        return(
          <tr>
          <td align="left">{consulta.medico.especialidade.nome}</td>
          <td align="left">{`Dr. ${consulta.medico.nome}`}</td>
          <td align="left">{consulta.dia}</td>
          <td align="left">{consulta.horario}</td>
          <td align="right">
            <button className="desmarcar-btn">
              <img src={xvector} alt="vector" className="xvector" />
              Desmarcar
            </button>
          </td>
        </tr>
        )
      });
    };
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="home-content">
      <header>
        <div className="logo-consulta">
          <img src={logo} alt="logo" className="logo-box-consulta"/>
          <h1>Medicar</h1>
        </div>
        <div className="menu">
          <p>Usuário</p>
          <a href="/">Desconectar</a>
        </div>
      </header>
      <section>
        <div className="info">
          <h4>Consulta Clínica</h4>
          <button className="new-button">
            <img src={vector} alt="vector" className="vector"/>
            Nova Consulta
          </button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th align="left">ESPECIALIDADE</th>
                <th align="left">PROFISSIONAL</th>
                <th align="left">DATA</th>
                <th align="left">HORA</th>
              </tr>
            </thead>
            <tbody>
              {consultas && renderData()}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Home;