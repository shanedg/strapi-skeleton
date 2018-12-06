FROM node:alpine

# TODO: bring down image size with multi stage container build?

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
COPY ecosystem.config.js .
COPY favicon.ico .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
# RUN npm install --production
RUN npm ci --production

# Install pm2
RUN npm install pm2 -g

# Expose the listening port of your app
EXPOSE 1337

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "strapi-skeleton-dev", "--env", "localdocker" ]
