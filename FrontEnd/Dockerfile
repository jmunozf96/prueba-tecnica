#Primera Etapa
FROM node:14.18-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod


FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/prueba-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
