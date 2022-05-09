# Desafio Intmed - Frontend


## Contexto
 
 Esse é um repositório criado para armazenar o desafio técnico do processo seletivo da Intmed. Foi desenvolvida uma aplicação (frontend) onde é possível acompanhar e agendar consultas médicas. O projeto foi desenvolvido em React.js e integração realizada com a seguinte [API](https://github.com/Intmed-Software/desafio-mock-server).  

## Instalação

1. Clone o repositório

- `git clone https://github.com/ntozato/Intmed.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd Intmed`

2. Instale as dependências da api

- `cd api`
- `cd desafio-mock-server`
- `npm install`

3. Inicialize o servidor

- `npm run start`

4. Instale as dependências do frontend

- Abra outro terminal e a partir da pasta que você clonou (Intmed), realize os seguintes comandos:
- Entre na pasta frontend
  - `cd frontend`
  - `npm install`

5. Abra o projeto no navegador

- `npm start`

## Observações e usabilidade

### Página de Login
  - A api utilizada não permite novos cadastros. Sendo assim, é necessário entrar com os seguintes dados:
    - no campo `Email ou Login` entre com `intmed`.
    - no campo `Senha` entre com `challenge`.
  
### Página Home
  - Ao clicar no botão `Nova Consulta` abrirá um formulário para ser preenchido. As opções do formulário são obtidas através da api.
  - Ao clicar no botão `Confirmar`, a api sempre retorna o mesmo valor, independente das opções preenchidas no formulário.
