FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 3004
CMD [ "npm", "run", "start" ]