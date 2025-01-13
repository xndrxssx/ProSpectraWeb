# ProSpectraWeb
ProSpectra Web is the administrative interface for winegrowers and managers. The platform provides tools for analyzing grape quality, customizing predictive models, and generating reports.

## Main Features
- **Send spectral data** (locally or directly from the spectrometer).
- **Configure predictive models and filters** for different grape varieties.
- **Interactive dashboards** with detailed graphs and tables.
- **User management** with customized permissions.
- **Export reports** in PDF or Excel.

## Technologies Used
- **Frontend Framework**: Next.js 15
  - Using **Turbopack** for faster builds.
- **Backend**: 
  - Next.js API Routes.
  - Prisma ORM for database management.
- **Database**:
  - MySQL (Prisma).
  - MongoDB (Mongoose for ODM).
- **Authentication**: 
  - JWT (JSON Web Token).
  - NextAuth.js for authentication flow.
- **Styling**:
  - Tailwind CSS (with plugins like `tailwind-merge` and `tailwindcss-animate`). 
- **UI Components**:
  - Radix UI (Dialog, Tooltip, Label, etc.).
  - shadcn UI.
- **State Management**: Context API (from React).
- **Development Tools**:
  - TypeScript for type safety.
  - ESLint for linting.
- **Platform**:
  - Node.js 20 for executing JavaScript code.

## Images

Here are some screenshots of the ProSpectra Web interface:

### Landing Page

![prospectra home](https://github.com/user-attachments/assets/c0030ab6-518d-49f4-b602-817efe221802)

### Administrator Home

![prospectra login](https://github.com/user-attachments/assets/97f0f17e-387c-421d-9eb1-2b1a2c34f3af)

## Getting Started

### Installation

Before running the development server, make sure to install the necessary dependencies. Run the following command in the project directory:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### `.env` File Configuration

This project uses a `.env` file to store sensitive environment variables. Follow the instructions below to properly configure the file:

1. **Create the `.env` file in the root of the project**.
2. **Add the necessary environment variables** by copying the example below:

```env
# Database URL (e.g. MySQL) for Prisma
DATABASE_URL="<mysql>://root:root@localhost:3306/prospectra"

# Secret key for JWT
JWT_SECRET="super_secret_key_123"

# Server port (if you do not use the default 3000)
PORT=3000

# Environment (development, production, etc.)
NODE_ENV=development

# MongoDB database URL for integration
MONGODB_URI="mongodb+srv://<user>:<password>@<cluester.something>.mongodb.net/"
```

### Prisma Configuration

This project uses [Prisma](https://www.prisma.io/) as an ORM to interact with the database. Follow the steps below to configure Prisma for this project.

#### 1. Install Prisma

Ensure you have Prisma CLI installed globally or locally in your project. If it's not already installed, run:

```bash
npm install prisma --save-dev
npx prisma init
```

#### 2. Update the .env File

Prisma relies on the DATABASE_URL environment variable to connect to your database.

#### 3. Prisma Schema

The Prisma schema is located in the prisma/schema.prisma file. This file defines your data models and their relationships.

#### 4. Run Migrations

To apply changes from your Prisma schema to the database, run:

```
npx prisma migrate dev --name init
```
This will:

- Create the necessary tables in your database.
- Track migrations to keep the schema in sync.

#### 5. Generate Prisma Client

Generate the Prisma Client to use it in your code:
```
npx prisma generate
```



### Running the Development Server

After installing the dependencies, start the development server with one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open your browser and navigate to: http://localhost:3000/

This will load the application in development mode.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

