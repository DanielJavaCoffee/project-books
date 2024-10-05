# Locadora de Livros - API

Esta é uma API para gerenciar uma locadora de livros, permitindo o cadastro de usuários, livros e controle de aluguéis. O sistema foi desenvolvido em Node.js, utilizando SQLite como banco de dados e diversas bibliotecas para funcionalidades específicas.

## Funcionalidades

- Cadastro de Usuários
- Cadastro de Livros
- Gerenciamento de Aluguéis (empréstimos e devoluções)
- Pesquisa de Livros por Título ou Autor
- Envio de e-mails de lembrete para devolução de livros
- Rotinas agendadas para verificar prazos de devolução

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente:
    ```
    EMAIL=seuemail@gmail.com
    PASS=suaSenha
    SECRET_JWT=suaChaveSecretaJWT
    ```
4. Execute as migrações de banco de dados (criação das tabelas):
    ```bash
    npm run migrate
    ```

5. Inicie o servidor:
    ```bash
    npm run dev
    ```

## Endpoints Principais

- **Usuários**:
  - `POST /users`: Cadastra um novo usuário.
  - `GET /users`: Lista todos os usuários.
  - `GET /users/:id`: Busca um usuário pelo ID.
  - `PUT /users/:id`: Atualiza um usuário.
  - `DELETE /users/:id`: Remove um usuário.

- **Livros**:
  - `POST /books`: Cadastra um novo livro.
  - `GET /books`: Lista todos os livros.
  - `GET /books/:id`: Busca um livro pelo ID.
  - `PUT /books/:id`: Atualiza um livro.
  - `DELETE /books/:id`: Remove um livro.

- **Aluguéis**:
  - `POST /loans`: Cria um novo empréstimo de livro.
  - `GET /loans`: Lista todos os empréstimos.
  - `DELETE /loans/:id`: Remove um empréstimo.

## Dependências

- **bcrypt**: Utilizado para hashing de senhas dos usuários.
- **dotenv**: Gerencia variáveis de ambiente, como credenciais sensíveis.
- **express**: Framework para criar a API com rotas e middlewares.
- **jsonwebtoken**: Utilizado para autenticação JWT.
- **moment**: Biblioteca de manipulação de datas para verificar vencimento de aluguéis.
- **node-cron**: Agendamento de tarefas recorrentes, como lembretes de vencimento.
- **nodemailer**: Utilizado para enviar e-mails de lembrete.
- **nodemon**: Ferramenta para desenvolvimento, reinicia o servidor automaticamente ao detectar mudanças.
- **sqlite3**: Banco de dados utilizado para armazenar os usuários, livros e aluguéis.
- **zod**: Validação de dados de entrada.

## Agendamento e Envio de E-mails

O sistema utiliza a biblioteca `node-cron` para agendar verificações diárias sobre os aluguéis de livros e, se necessário, envia lembretes para os usuários, utilizando a `nodemailer`.

## Executando os Testes

Utilize o Insomnia ou Postman para testar os endpoints da API.

## Contribuição

Fique à vontade para abrir issues e pull requests.

## Licença

Este projeto é licenciado sob a MIT License.
