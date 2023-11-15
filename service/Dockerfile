## Development ###
FROM node:20.5-alpine3.17 AS development
RUN apk update && apk add bash
WORKDIR /app/service
COPY ./package*.json ./
RUN yarn install
COPY . .

## Build ###
FROM development as build
RUN yarn build

### Production ###
FROM node:20.5-alpine3.17 AS production
WORKDIR /app/service
COPY --from=build /app/service/node_modules  ./node_modules 
COPY --from=build /app/service/dist ./dist
EXPOSE 3000

CMD ["node", "dist/main"]