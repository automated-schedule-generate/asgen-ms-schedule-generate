FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start:prod"]