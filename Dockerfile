FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ui

EXPOSE 11125

CMD ["npm", "start"]