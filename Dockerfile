# Stage 1: Build C library
FROM ubuntu:24.04 AS cbuilder

WORKDIR /build/DLPLib
# Copia apenas a pasta da biblioteca C
COPY backend/DLPLib/ .
# Atualiza pacotes para mitigar vulnerabilidades e instala dependências de build
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential gcc && \
    # Compila os arquivos objeto primeiro
    gcc -c -Wall -DTPL_NOLIB -fPIC *.c && \
    # Depois, linka os objetos em uma biblioteca compartilhada
    gcc -shared -o libDLPSpectrumLibrary.so *.o

# --------------------------------------------------------------------

# Stage 2: Build Next.js frontend (Otimizado)
FROM node:20 AS frontend-builder

# Atualiza pacotes para mitigar vulnerabilidades na imagem base
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY tsconfig.docker.json ./tsconfig.json
COPY next.config.ts ./next.config.ts
COPY tailwind.config.ts ./tailwind.config.ts
COPY tailwind.config.js ./tailwind.config.js
COPY postcss.config.mjs ./postcss.config.mjs 
COPY postcss.config.js ./postcss.config.js
COPY eslint.config.mjs   ./eslint.config.mjs
COPY next-env.d.ts      ./next-env.d.ts
 
COPY components.json ./components.json       

RUN npm install

# Agora, copia o resto do código-fonte (incluindo a pasta prisma)
COPY frontend/static ./static
COPY frontend/src ./src
COPY frontend/public ./public
COPY backend/prisma ./prisma

# GERA O PRISMA CLIENT ANTES DO BUILD
RUN npx prisma generate --schema=./prisma/prospectra.prisma --generator js_client

# Constrói a aplicação
RUN npm run build

# --------------------------------------------------------------------

# Stage 3: Final container (Python backend + frontend + C lib)
FROM python:3.11-slim AS final

WORKDIR /app

# Instala dependências do sistema e atualiza pacotes para mitigar vulnerabilidades
RUN apt-get update && apt-get upgrade -y && apt-get install -y libhidapi-hidraw0 libhidapi-libusb0 libusb-1.0-0 && \
    rm -rf /var/lib/apt/lists/*

# Copia o frontend compilado do estágio anterior
COPY --from=frontend-builder /app/.next ./frontend/.next
COPY --from=frontend-builder /app/public ./frontend/public
COPY --from=frontend-builder /app/package.json ./frontend/package.json

# Copia o backend Python
COPY backend/app ./backend/app

# Copia o schema do Prisma
COPY backend/prisma ./backend/prisma

# Copia o arquivo de requisitos do Python
COPY requirements.txt .

# Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia a biblioteca C compilada
COPY --from=cbuilder /build/DLPLib/libDLPSpectrumLibrary.so /app/backend/

# Gera o Prisma Client Python (ainda necessário para o backend)
# Nota: prisma já foi instalado via requirements.txt
RUN prisma generate --schema=./backend/prisma/prospectra.prisma

# Expondo a porta da API
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
