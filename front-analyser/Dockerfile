FROM node:18 AS build

WORKDIR /app

COPY ./front-analyser/package*.json ./

RUN npm install

COPY ./front-analyser .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
