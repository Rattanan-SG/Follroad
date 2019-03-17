FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8080
CMD [ "npm", "start"]