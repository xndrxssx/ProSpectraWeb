# ProSpectraWeb
ProSpectra Web é a interface administrativa para viticultores e gerentes. A plataforma oferece ferramentas para analisar a qualidade das uvas, personalizar modelos preditivos e gerar relatórios.

## Funcionalidades Principais
- Enviar dados espectrais (localmente ou diretamente do espectrômetro).
- Configurar modelos preditivos e filtros para diferentes variedades de uvas.
- Painéis interativos com gráficos e tabelas detalhadas.
- Gerenciamento de usuários com permissões personalizadas.
- Exportar relatórios em PDF ou Excel.

## Tecnologias Utilizadas
### Frontend:
- Next.js 15 (utilizando Turbopack para builds mais rápidos).
### Backend:
- Next.js API Routes.
- Prisma ORM para gerenciamento de banco de dados.
- FastAPI para backend em Python.
### Banco de Dados:
- MySQL (Prisma).
### Autenticação:
- JWT (JSON Web Token).
- NextAuth.js para o fluxo de autenticação.
### Estilo:
- Tailwind CSS (com plugins como tailwind-merge e tailwindcss-animate).

## Imagens
Aqui estão algumas capturas de tela da interface do ProSpectra Web:

### Página de Entrada

![prospectra home](https://github.com/user-attachments/assets/c0030ab6-518d-49f4-b602-817efe221802)

### Página Inicial do Administrador

![prospectra login](https://github.com/user-attachments/assets/97f0f17e-387c-421d-9eb1-2b1a2c34f3af)

### Enviar espectro para predição

![envio de dados locais](https://github.com/user-attachments/assets/b350c147-f2ed-404b-a864-0a362f211311)

### Realizar predições com os espectros

![aplicar modelo](https://github.com/user-attachments/assets/0725db61-12b6-446c-ab52-65e51963d05c)

### Treinar modelo

![TREINAR](https://github.com/user-attachments/assets/e40896f1-9255-4162-9056-7ac94c2527dd)

### Salvar dados espectrais para treinamento

![WAVELENGT](https://github.com/user-attachments/assets/be6ce56c-1cc3-4429-9e0f-0b0853c48ab7)

### Gerenciar usuários

![gerenciar](https://github.com/user-attachments/assets/4f581f34-5a4a-40d1-b2b5-b85964d0e0d3)

### Histórico

![historico](https://github.com/user-attachments/assets/aaec42b0-ecc9-42be-8f11-cf1cd5900f0a)

### Registrar informações sobre as uvas

![VARIEDADE](https://github.com/user-attachments/assets/210ae82d-8537-47be-8584-35142987774f)

### Dashboard - gráficos

![grafico](https://github.com/user-attachments/assets/904a6334-6642-4056-829d-fea2ae7b86c8)

### Dashboard - relatório

![relatorio](https://github.com/user-attachments/assets/fe012d54-967b-4495-b720-abce70947503)

### Dashboard - comparações

![comparações](https://github.com/user-attachments/assets/d7a81e8d-831e-4860-85cc-2acb0512b07e)

### Dashboard - espectros

![espectros](https://github.com/user-attachments/assets/93e3559f-0c99-42b4-8d33-0768509768bd)


## Como Começar

### Instalação
Antes de rodar o servidor de desenvolvimento, instale as dependências necessárias. Execute o comando a seguir no diretório do projeto:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Configuração do Arquivo .env
Este projeto utiliza um arquivo .env para armazenar variáveis de ambiente sensíveis. Siga as instruções abaixo para configurar o arquivo corretamente:

1. Crie o arquivo .env na raiz do projeto.
2. Adicione as variáveis de ambiente necessárias, copiando o exemplo abaixo:

```env
# URL do banco de dados (por exemplo, MySQL) para o Prisma
DATABASE_URL="<mysql>://<usuario>:<senha>@localhost:<porta>/prospectra"

# Chave secreta para o JWT
JWT_SECRET="super_secret_key_123"

# Porta do servidor (se não usar a porta 3000 padrão)
PORT=3000

# Ambiente (desenvolvimento, produção, etc.)
NODE_ENV=development

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Configuração do Prisma

Este projeto utiliza Prisma como ORM para interagir com o banco de dados. Siga os passos abaixo para configurar o Prisma para este projeto:

1. Instale o Prisma
Certifique-se de ter o Prisma CLI instalado globalmente ou localmente no seu projeto. Se ainda não estiver instalado, execute:

```bash
npm install prisma --save-dev
npx prisma init
```

2. Atualize o arquivo .env
O Prisma depende da variável de ambiente DATABASE_URL para se conectar ao seu banco de dados.

3. Esquema Prisma
O esquema do Prisma está localizado no arquivo prisma/schema.prisma. Esse arquivo define seus modelos de dados e suas relações.

4. Execute as Migrações
Para aplicar as alterações do seu esquema Prisma no banco de dados, execute:

```
npx prisma migrate dev --name init
```
Isso irá:

- Criar as tabelas necessárias no banco de dados.
- Rastrear as migrações para manter o esquema sincronizado.

5. Gere o Prisma Client
Para usar o Prisma Client no seu código, execute:

```
npx prisma generate
```

### Configuração do Python

1. Navegue até o diretório do backend:

    ```bash
    cd src
    cd backend  # Ou o nome da pasta do seu backend
    ```

2. Crie e ative o ambiente virtual (opcional, mas recomendado):

    ```bash
    python -m venv env
    source .\env\Scripts\activate  # No Windows use 'venv\Scripts\activate'
    ```

3. Instale as dependências do backend:

    ```bash
    pip install -r requirements.txt
    ```

4. Execute o servidor FastAPI:

    ```bash
    uvicorn src.app.api.python.main:app
    ```

   Agora sua API estará rodando em `http://localhost:8000`.

### Configurando o Next.js

1. Navegue ate a raiz do projeto
    ```bash
    cd ..
    npm install
    ```

2. Inicie o servidor de desenvolvimento com o comando:
    ```bash
    npm run dev
    ```
Isso iniciará o servidor no modo de desenvolvimento.

3. Abra o seu navegador e acesse:
```
http://localhost:3000/
```
Agora você poderá visualizar a aplicação em execução localmente.
