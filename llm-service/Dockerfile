# Use a imagem base
FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de package e instale as dependências
COPY package*.json ./
RUN npm install

# Copie os arquivos da aplicação
COPY . .

# Compile o código TypeScript
RUN npm run build

# Defina o comando de inicialização
CMD ["node", "dist/index.js"]
