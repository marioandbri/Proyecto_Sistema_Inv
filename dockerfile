FROM node:lts

COPY . .

RUN "npm install"

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]
