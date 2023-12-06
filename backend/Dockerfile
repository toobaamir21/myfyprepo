FROM node:17-alpine

RUN npm install -g nodemon
WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

# EXPOSE 5000
# EXPOSE 27017
# COPY redis.conf /usr/local/etc/redis/redis.conf
# CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
ENTRYPOINT [ "npm","run","dev" ]