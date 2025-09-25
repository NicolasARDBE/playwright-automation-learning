FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y fonts-liberation
COPY . .

CMD ["npx", "playwright", "test", "--reporter=dot"]