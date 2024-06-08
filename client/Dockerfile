From node:22-alpine
WORKDIR /app
Copy package*.json .
RUN npm install
Copy . .
EXPOSE 5173
CMD npm start