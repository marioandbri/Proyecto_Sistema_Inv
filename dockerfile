FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV=production
ENV REMOTE_DEPLOY=true
ENV SESSION_SECRET=nosecret
ENV ADMIN_KEY=TESTING
ENV MONGODB_HOST=cluster0.vbabg.mongodb.net
ENV MONGODB_DATABASE=proyectoInv 
ENV MONGODB_USERNAME=developer 
ENV MONGODB_PASSWORD=rYqH1QPBibohxwES

EXPOSE 4000

CMD ["npm", "start"]
