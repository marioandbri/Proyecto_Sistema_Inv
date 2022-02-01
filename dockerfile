FROM node:lts

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=4000
ENV NODE_ENV=development
ENV SESSION_SECRET=nosecret
ENV ADMIN_KEY=TESTING

EXPOSE 4000

CMD ["npm", "start"]
