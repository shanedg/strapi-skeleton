FROM node:alpine

# https://bitbucket.org/site/master/issues/16334/pipelines-failing-with-could-not-get-uid
# https://github.com/npm/npm/issues/20861
RUN npm config set unsafe-perm true

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
COPY ecosystem.config.js .
COPY favicon.ico .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
# RUN npm install --production
RUN npm ci --production

# Expose the listening port of your app
EXPOSE 1337

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--only", "strapi-skeleton", "--env", "staging" ]
