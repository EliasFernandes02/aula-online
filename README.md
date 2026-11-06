# Aula Online

Projeto de estudo com uma API REST para gerenciamento de usuários e categorias, usando Node.js, Express, Sequelize e PostgreSQL. O servidor também disponibiliza uma interface web simples para cadastrar, consultar, editar e remover usuários.

## Requisitos

- Node.js e npm
- PostgreSQL acessível pela aplicação

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz do projeto:

   ```env
   PORT=3000
   DATABASE_URL=postgres://usuario:senha@host:5432/nome_do_banco
   ```

   A conexão está configurada para usar SSL. Ajuste a URL conforme as credenciais e o endereço do seu PostgreSQL.

3. Crie no banco as tabelas `usuarios` e `categorias`. O projeto não executa migrations nem cria as tabelas automaticamente. Elas devem ter os campos usados pelos modelos:

   - `usuarios`: `id`, `nome`, `email`, `senha`
   - `categorias`: `id`, `nome`, `descricao`

## Executar

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Abra `http://localhost:3000` (ou a porta configurada em `PORT`) para acessar a interface de usuários.

## API

As rotas recebem e retornam JSON. Os recursos disponíveis são:

| Método | Rota | Ação |
|---|---|---|
| `GET` | `/usuarios` | Lista usuários |
| `GET` | `/usuarios/:id` | Busca um usuário |
| `POST` | `/usuarios` | Cria um usuário |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |
| `GET` | `/categorias` | Lista categorias |
| `GET` | `/categorias/:id` | Busca uma categoria |
| `POST` | `/categorias` | Cria uma categoria |
| `PUT` | `/categorias/:id` | Atualiza uma categoria |
| `DELETE` | `/categorias/:id` | Remove uma categoria |

Exemplos de corpos para criação:

```json
{
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "senha": "uma-senha"
}
```

```json
{
  "nome": "Programação",
  "descricao": "Cursos e conteúdos de programação"
}
```

As consultas de usuários não incluem o campo `senha` nas respostas. Para uso fora de um ambiente de estudo, armazene senhas com hash seguro e valide os dados também na API.

## Estrutura

- `app.js`: configura o Express, serve a pasta `public` e registra as rotas.
- `route/`: define as rotas HTTP.
- `controller/`: trata requisições e respostas.
- `repository/`: acessa os modelos do Sequelize.
- `models/`: define os modelos `Usuario` e `Categoria`.
- `db/sequelize.js`: configura a conexão PostgreSQL.
- `public/`: interface web de gerenciamento de usuários.
