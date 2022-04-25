const axios = require('axios');

const url = 'http://localhost:3001/';

const login = (user) => axios.post(`${url}users/login`, user);

const getEspecialidades = (token) => axios.get(
  `${url}especialidades`,
  { headers: { authorization: `Token ${token}` } },
);

const getMedicos = (token) => axios.get(
  `${url}medicos`,
  { headers: { authorization: `Token ${token}` } },
);

const getConsultas = (token) => axios.get(
  `${url}consultas`,
  { headers: { authorization: `Token ${token}` } },
);

const getAgendas = (token) => axios.get(
  `${url}agendas`,
  { headers: { authorization: `Token ${token}` } },
);

const postConsultas = (token) => axios.post(
  `${url}consultas`,
  {},
  { headers: { authorization: `Token ${token}` } },
);

const removeConsulta = (token) => axios.delete(
  `${url}consultas/:id`,
  { headers: { authorization: `Token ${token}` } },
);

const api = {
  login,
  getEspecialidades,
  getMedicos,
  getConsultas,
  postConsultas,
  removeConsulta,
  getAgendas
}

export default api;
