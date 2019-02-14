FROM node:lts-alpine

# per: https://github.com/shanedg/strapi-skeleton/issues/31
#
# likely related to:
# https://bitbucket.org/site/master/issues/16334/pipelines-failing-with-could-not-get-uid
# https://github.com/npm/npm/issues/20861
#
# update: also ran into this issue when moving from node:alpine to lts-alpine:
# https://github.com/voidlinux/void-packages/issues/4147
# and without this unsafe-perm fix, heroku builds are failing
RUN npm config set unsafe-perm true

# Install pm2
RUN npm install pm2 -g

WORKDIR /app/strapi-skeleton

# Bundle APP files
COPY api api/
COPY config config/
COPY public public/
COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY ecosystem.prod.config.js .
COPY favicon.ico .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --production

# Expose the listening port of your app
EXPOSE 1337

# [debugging] Show current folder structure in logs
# RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.prod.config.js" ]
