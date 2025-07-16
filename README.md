# 🍇 ProSpectra Web 
ProSpectra Web é uma plataforma de gerenciamento para viticultores, permitindo a análise da qualidade de uvas através de dados espectrais. A aplicação oferece ferramentas para configurar modelos preditivos, visualizar dados em dashboards interativos e gerar relatórios detalhados.
  
<a name="ancora"></a>
## 🗂️ Tabela de Conteúdos
- ✨ [Funcionalidades Principais](#ancora1)
- 📸 [Interface do Sistema](#ancora2)
- 🛠️ [Tecnologias Utilizadas](#ancora3)
- 🚀 [Começando](#ancora4)
- 📑 [Pré-requisitos](#ancora5)
- ☑️ [Instalação Local](#ancora6)
- 🐳 [Executando com Docker](#ancora7)
- 🤝 [Como Contribuir](#ancora8)

<a id="ancora1"></a>
## ✨ Funcionalidades Principais
- **Análise Espectral:** Envio de dados localmente ou diretamente do espectrômetro para análise.
- **Modelagem Preditiva:** Configuração de modelos e filtros para diferentes variedades de uvas.
- **Dashboards Interativos:** Visualização de dados com gráficos e tabelas detalhadas.
- **Gestão de Acesso:** Gerenciamento de usuários com permissões personalizadas.

<a id="ancora2"></a>
## 📸 Interface do Sistema
Aqui estão algumas capturas de tela da interface do ProSpectra Web:
<details>
  <summary>Clique aqui para ver as capturas de tela da aplicação</summary>

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
</details>

<a id="ancora3"></a>
## 🛠️ Tecnologias Utilizadas
| **Categoria**    | **Tecnologia** |
| -------- | ------- |
| Frontend  | [Next.js](https://nextjs.org) 15 (com [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack))    |
| Backend | [FastAPI](https://fastapi.tiangolo.com) (Python) e [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)     |
| Banco de Dados    | [MySQL](https://www.mysql.com) com [Prisma ORM](https://www.prisma.io)    |
| Autenticação    | [NextAuth.js](https://next-auth.js.org) com [JWT](https://jwt.io)    |
| Estilo    | [Tailwind CSS](https://tailwindcss.com) (com `tailwind-merge` e `tailwindcss-animate`)    |
| Deployment    | [Docker](https://www.docker.com)    |

<a id="ancora4"></a>
## 🚀 Começando
Siga estas instruções para configurar e executar o projeto em seu ambiente local.
<a id="ancora5"></a>
**Pré-requisitos**
- [Node.js](https://nodejs.org/pt) (versão 20 ou superior)
- [Python](https://www.python.org) (versão 3.11 ou superior)
- [Docker](https://docs.docker.com/get-started/get-docker/) (opcional, para execução em container)
- Um servidor de banco de dados MySQL acessível.
<a id="ancora6"></a>
**Instalação Local**
1. Clone o repositório:
```bash
git clone https://github.com/xndrxssx/ProSpectraWeb.git
cd prospectra-web
```
2. Instale as dependências do frontend:
```bash
npm install
# ou yarn install, pnpm install, bun install
```
3. Instale as dependências do backend:
```bash
pip install -r requirements.txt
```
4. Configure as Variáveis de Ambiente:
- Crie um arquivo `.env` na raiz do projeto.
- Copie o conteúdo do exemplo abaixo e preencha com suas credenciais.
```bash
# URL de conexão do seu banco de dados MySQL para o Prisma
DATABASE_URL="mysql://<USUARIO>:<SENHA>@<HOST>:<PORTA>/prospectra"

# Chave secreta para o JWT e NextAuth.js
JWT_SECRET="gere_uma_chave_secreta_forte_aqui"
NEXTAUTH_SECRET="gere_outra_chave_secreta_aqui"
NEXTAUTH_URL="http://localhost:3000"

# URL para o frontend se conectar ao backend FastAPI
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```
5. Configure o Banco de Dados com Prisma:
- Aplique as migrações para criar as tabelas no seu banco de dados:
```bash
npx prisma migrate dev --name init
```
- Gere o Prisma Client para ser usado pela aplicação:
```bash
npx prisma generate
```
6. Execute a Aplicação:
- Em um terminal, inicie o backend FastAPI:
```bash
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
- Em outro terminal, inicie o frontend Next.js:
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

<a id="ancora7"></a>
## 🐳 Executando com Docker
Para uma implantação simplificada, use o Docker e o Docker Compose.
1. Configure o arquivo `.env` conforme o passo 4 da instalação local.
2. Inicie os containers:
```bash
docker-compose up --build
```
Este comando irá construir as imagens e iniciar os serviços do frontend, backend e banco de dados automaticamente.
**Observação sobre o Hardware:** Para que o container Docker acesse o espectrômetro via USB, pode ser necessário passar o dispositivo com a flag `--device=/dev/hidraw0` (ou o nome correspondente no seu sistema) e executar o container com privilégios.

<a id="ancora8"></a>
## 🤝 Como Contribuir
Contribuições são bem-vindas! Se você deseja ajudar a melhorar o ProSpectra Web, siga estes passos:
1. Faça um Fork do projeto.
2. Crie uma nova Branch (`git checkout -b feature/sua-feature`).
3. Faça suas alterações e Commit (`git commit -m 'feat: Adiciona nova feature'`).
4. Envie para a sua Branch (`git push origin feature/sua-feature`).
5. Abra um Pull Request.
