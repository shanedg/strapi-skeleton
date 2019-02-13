FROM node:alpine

# TODO: bring down image size with multi stage container build?

# Install pm2
RUN npm install pm2 -g

WORKDIR /app/strapi-skeleton

# Bundle APP files
COPY admin admin/
COPY api api/
COPY config config/
COPY plugins plugins/
COPY public public/
COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY ecosystem.prod.config.js .
# COPY ecosystem.config.js . ## dev testing
COPY favicon.ico .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --production

# Expose the listening port of your app
EXPOSE 1337

# [debugging] Show current folder structure in logs
# RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.prod.config.js" ]
# CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "localdocker" ] ## dev testing
