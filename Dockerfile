FROM node

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 1863

CMD ["node", "app.js"]