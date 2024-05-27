# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

## Rotas da aplicação

### Usuários

- `POST /users` -> Cria um usuário
  request body:
  ```json
  {
    "name": "Carlos Henrique",
    "email": "carlos@gmail.com",
    "password": "123456"
  }
  ```
- `POST /sessions` -> Autentica um usuário
  request body:

  ```json
  {
    "email": "carlos@gmail.com",
    "password": "123456"
  }
  ```

- `PATCH /token/refresh` -> Atualiza o token de um usuário
- `GET /me` -> Retorna o perfil de um usuário

### Check-ins

- `GET /check-ins/history` -> Retorna o histórico de check-ins de um usuário

- `GET /check-ins/metrics` -> Retorna o número de check-ins de um usuário

- `POST /gyms/:gymId/check-ins` -> Realiza um check-in em uma academia
  - response body:
  ```json
  {
    "userId": "1",
    "gymId": "1",
    "createdAt": "2021-09-01T12:00:00"
  }
  ```
- `PATCH /check-ins/:checkInId/validate` -> Valida um check-in

### Academias
- `GET /gyms/search` -> Busca academias pelo nome
- `GET /gyms/nearby` -> Busca academias próximas
- `POST /gyms` -> Cadastra uma academia
  request body:
  ```json
  {
    "title": "JavaScript Gym",
    "description": "Some description.",
    "phone": "1199999999",
    "latitude": -27.2092052,
    "longitude": -49.6401091
  }
  ```

<h2 align="center"> Feito por Carlos Henrique ❤️</h2>