FROM node:10.15.1-alpine as builder
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
COPY --from=builder /usr/src/app/build /usr/share/nginx/html