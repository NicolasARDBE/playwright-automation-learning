FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Carpeta de trabajo
WORKDIR /app

# Copiamos solo package.json y lock para instalar dependencias
COPY package*.json ./

# Instalamos dependencias y browsers de Playwright
RUN npm ci && npx playwright install --with-deps

# Movemos node_modules fuera de /app para evitar que lo pise el volumen
RUN mv node_modules /node_modules
ENV PATH=/node_modules/.bin:$PATH

# Copiamos el resto del código
COPY . .

# Comando por defecto
CMD ["npx", "playwright", "test", "--reporter=dot"]
