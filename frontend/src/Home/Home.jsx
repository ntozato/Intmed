import React, { useEffect, useState } from "react";
import api from '../api/index';
import logo from '../../src/intmed-logo.png';
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
          <p>Desconectar</p>
        </div>
      </header>
    </div>
  );
}

export default Home;