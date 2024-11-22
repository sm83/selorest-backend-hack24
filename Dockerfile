FROM node:alpine3.20

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
