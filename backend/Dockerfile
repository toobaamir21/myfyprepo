FROM node:17-alpine
FROM mongo-express

RUN npm install -g nodemon
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT [ "npm","run","dev" ]