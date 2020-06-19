FROM node:12.16.2-alpine
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["npm", "start"]