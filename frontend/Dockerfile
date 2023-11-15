## Development ###
FROM node:20.5-alpine3.17 as development
RUN apk update && apk add bash
WORKDIR /app/frontend
COPY ./package*.json ./
RUN yarn install
COPY . .

## Build ###
FROM development as build
RUN yarn build

## Production ###
FROM nginx:1.25.3-alpine as production
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]