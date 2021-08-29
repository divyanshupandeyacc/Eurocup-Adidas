FROM node:erbium as build

WORKDIR /build

ENV npm_config_registry=https://tools.adidas-group.com/artifactory/api/npm/npm-virtual

COPY . /build

RUN npm ci \
 && npm run build

FROM nginx:alpine

COPY --from=build /build/dist /usr/share/nginx/html
