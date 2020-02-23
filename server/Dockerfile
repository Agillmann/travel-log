# ---- Node container ----

FROM node
WORKDIR /app
RUN npm init -y
RUN npm i pm2 -g
RUN npm i express mongoose morgan helmet cors dotenv express-rate-limit rate-limit-mongo
COPY ./src .
VOLUME /app
CMD ["pm2-dev", "index.js"]