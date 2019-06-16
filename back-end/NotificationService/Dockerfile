FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 3002
CMD [ "npm", "start"]