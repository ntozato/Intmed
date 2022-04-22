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

const postConsultas = (token) => axios.get(
  `${url}consultas`,
  { headers: { authorization: `Token ${token}` } },
);

const removeConsulta = () => axios.delete(`${url}consultas/:id`);

const api = {
  login,
  getEspecialidades,
  getMedicos,
  getConsultas,
  postConsultas,
  removeConsulta
}

export default api;
