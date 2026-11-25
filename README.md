# LENZ - Fotografia e sua relação com o tempo

O **LENZ** é uma aplicação web voltada à experiência fotográfica. A proposta é permitir que o usuário conheça mais sobre o criador, entenda o por quê do projeto, permitir que voocê registre suas fotografias, organize seus registros por categorias, encontre referências para novos cliques e acompanhe sua atividade fotográfica ao longo do tempo.

## Funcionalidades

- **Cadastro e login:** criação de conta e autenticação de usuários.
- **Início:** página de boas-vindas e acesso às áreas da aplicação.
- **Inspirações:** apresentação de fotógrafos e fotografias de referência. O conteúdo desta página está definido diretamente no JavaScript.
- **Galeria pessoal:** envio de imagens, seleção de categoria, descrição, visualização e exclusão de fotografias.
- **Dashboard:** apresentação de indicadores e gráficos sobre os registros do usuário:
  - quantidade total de fotos;
  - fotos adicionadas no mês atual;
  - sequência de semanas com registros (*streak*);
  - média mensal de fotos;
  - quantidade de fotos por mês;
  - distribuição de fotos por categoria.

## Tecnologias utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript
- [Chart.js](https://www.chartjs.org/) para os gráficos da dashboard

### Back-end
- Node.js
- Express
- Multer para recebimento e armazenamento dos arquivos de imagem
- `mysql2` para comunicação com o banco de dados MySQL
- `dotenv` para leitura das variáveis de ambiente
- CORS

## Organização do projeto

```text
Projeto_Individual_SPTECH/
├── app.js
├── package.json
├── README.md
├── public/
│   ├── assets/
│   │   ├── imgs/galeria/       # Imagens enviadas pelos usuários
│   │   └── inspiracoes/        # Imagens usadas na página de inspirações
│   ├── css/                    # Folhas de estilo
│   ├── dashboard/
│   │   ├── inicio.html
│   │   ├── inspiracoes.html
│   │   ├── galeria.html
│   │   └── dashboard.html
│   ├── js/
│   ├── index.html
│   ├── login.html
│   └── cadastro.html
└── src/
    ├── config/
    │   └── configUpload.js
    ├── controllers/
    │   ├── usuarioController.js
    │   ├── fotoController.js
    │   └── dashboardController.js
    ├── database/
    │   ├── config.js
    │   └── script-tabelas.sql
    ├── models/
    │   ├── usuarioModel.js
    │   ├── fotoModel.js
    │   └── dashboardModel.js
    └── routes/
        ├── usuarios.js
        ├── foto.js
        └── dashboard.js
```

## Como executar o projeto

### 1. Pré-requisitos

Antes de iniciar, tenha instalado:

- Node.js e npm;
- MySQL Server;
- um cliente MySQL, como MySQL Workbench (opcional, mas recomendado).

### 2. Configurar o banco de dados

1. Inicie o MySQL Server.
2. Abra o arquivo `src/database/script-tabelas.sql`.
3. Execute o script para criar o banco `lenz`, as tabelas e as categorias iniciais.

O banco possui três tabelas principais:

| Tabela | Finalidade |
|---|---|
| `usuario` | Armazena os dados das contas cadastradas. |
| `categoria` | Armazena as categorias disponíveis para classificar fotografias. |
| `foto` | Armazena os dados de cada fotografia e seus relacionamentos com usuário e categoria. |

### 3. Configurar as variáveis de ambiente

O `app.js` está configurado inicialmente para carregar o arquivo `.env.dev`, correspondente ao ambiente de desenvolvimento.

Crie ou ajuste esse arquivo na raiz do projeto com as variáveis abaixo:

```env
AMBIENTE_PROCESSO=desenvolvimento

DB_HOST=localhost
DB_DATABASE=lenz
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_PORT=3306

APP_PORT=3333
APP_HOST=localhost
```

Ajuste usuário, senha, porta e demais valores de acordo com a configuração do seu computador.

> **Segurança:** não publique arquivos `.env` ou `.env.dev` com credenciais reais. Eles devem permanecer fora do Git. Para compartilhar o projeto, disponibilize apenas um arquivo de exemplo, como `.env.example`, com valores fictícios.

### 4. Instalar as dependências

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
```

### 5. Iniciar a aplicação

Para iniciar o servidor:

```bash
npm start
```

Também existe o comando de desenvolvimento:

```bash
npm run dev
```

Esse segundo comando utiliza o Nodemon para reiniciar o servidor quando arquivos monitorados forem alterados.

### 6. Acessar no navegador

Abra o endereço configurado em `APP_HOST` e `APP_PORT`. Com a configuração de exemplo acima:

```text
http://localhost:3333
```

Para encerrar o servidor, pressione `Ctrl + C` no terminal.

## Fluxo de funcionamento

A aplicação utiliza uma arquitetura em camadas. De forma geral, o caminho de uma operação que precisa do banco de dados é:

```text
Página HTML / JavaScript
        |
        | requisição HTTP (fetch)
        v
      Routes
        |
        v
    Controller
        |
        v
      Model
        |
        v
   MySQL Database
        |
        v
Resposta HTTP para o front-end
```

### 1. Cadastro e autenticação

1. O usuário preenche o formulário em `cadastro.html` ou `login.html`.
2. O JavaScript envia os dados para a API usando `fetch`.
3. A rota em `src/routes/usuarios.js` recebe a requisição.
4. `usuarioController.js` valida os campos e chama o model correspondente.
5. `usuarioModel.js` executa o `INSERT` ou `SELECT` por meio da conexão configurada em `src/database/config.js`.
6. O resultado retorna ao navegador. No login, os dados do usuário são utilizados para manter informações da sessão no `sessionStorage`.

### 2. Envio e gerenciamento de fotografias

O fluxo da galeria possui uma etapa adicional para lidar com arquivos:

1. O usuário seleciona uma imagem e informa categoria e descrição em `dashboard/galeria.html`.
2. O JavaScript monta um `FormData` e envia uma requisição `POST` para `/fotos/cadastrar`.
3. A rota `src/routes/foto.js` utiliza o Multer, configurado em `src/config/configUpload.js`, para receber o arquivo.
4. O Multer salva a imagem em `public/assets/imgs/galeria/` e gera um nome de arquivo.
5. `fotoController.js` recebe o nome do arquivo e os demais dados.
6. `fotoModel.js` registra no MySQL o caminho/nome da imagem, a categoria, a descrição e o usuário relacionado.
7. Para exibir a galeria, o front-end solicita as fotos do usuário pela rota de listagem. Para excluir, envia uma requisição `DELETE`.
8. O navegador utiliza os dados recebidos para montar os elementos da galeria.

**Importante:** o arquivo da imagem fica armazenado na pasta do projeto; o banco de dados guarda o nome/caminho utilizado para localizar esse arquivo e os demais metadados.

### 3. Dashboard e indicadores

1. Ao abrir `dashboard/dashboard.html`, o JavaScript identifica o usuário pelo `sessionStorage`.
2. O front-end realiza requisições `GET` para as rotas de dashboard.
3. `dashboardController.js` recebe cada requisição e chama a função correspondente em `dashboardModel.js`.
4. O model executa consultas SQL que calculam os indicadores e agrupam as fotografias por mês e categoria.
5. Os resultados retornam em JSON.
6. O JavaScript atualiza os indicadores da página e utiliza o Chart.js para desenhar os gráficos.

### 4. Página de inspirações

A página `dashboard/inspiracoes.html` funciona de maneira diferente das áreas anteriores: os dados dos fotógrafos e as referências de imagens estão definidos em um array JavaScript no próprio arquivo. Portanto, no estado atual do repositório, essa página não depende de uma consulta à API ou ao banco de dados.

## Rotas da API

| Método | Endpoint | Finalidade |
|---|---|---|
| `POST` | `/usuarios/cadastrar` | Cadastrar um usuário. |
| `POST` | `/usuarios/autenticar` | Autenticar um usuário. |
| `POST` | `/fotos/cadastrar` | Enviar uma imagem e registrar seus dados. |
| `GET` | `/fotos/listar/:fk_usuario` | Listar as fotos de um usuário. |
| `DELETE` | `/fotos/deletar/:idFoto/:fk_usuario` | Excluir uma foto pertencente ao usuário. |
| `GET` | `/dashboard/total-fotos/:idUsuario` | Consultar o total de fotos. |
| `GET` | `/dashboard/fotos-mes-atual/:idUsuario` | Consultar as fotos adicionadas no mês atual. |
| `GET` | `/dashboard/streak/:idUsuario` | Consultar a quantidade de semanas com registros. |
| `GET` | `/dashboard/media-mensal/:idUsuario` | Consultar a média mensal de fotos. |
| `GET` | `/dashboard/fotos-mes/:idUsuario` | Consultar a quantidade de fotos por mês no ano atual. |
| `GET` | `/dashboard/categorias/:idUsuario` | Consultar a quantidade de fotos por categoria. |

## Observações

- As páginas internas utilizam o `sessionStorage` para recuperar o identificador e o nome do usuário.
- As imagens enviadas ficam no armazenamento local do servidor, dentro de `public/assets/imgs/galeria/`.
- As inspirações são conteúdo estático no JavaScript, enquanto a galeria e a dashboard consultam a API e o MySQL.
- O script SQL cria as categorias iniciais utilizadas pelo formulário da galeria. Caso as categorias sejam alteradas no banco, os valores apresentados no formulário também precisam ser compatibilizados.

## Importante
- O projeto tem fins estritamente acadêmico e foi criada somente para testes. Sua comercialização não é permitida. Todos os direitos reservados a Ryan Leão.

