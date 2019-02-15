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

WORKDIR /app/strapi-skeleton

# necessary for `npm install`
COPY package.json .
COPY package-lock.json .
# necessary for postinstall script
COPY admin admin/
COPY plugins plugins/

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV production
RUN npm ci

# Bundle APP files
COPY favicon.ico .
COPY public public/
COPY config config/
COPY server.js .
COPY api api/

# Expose the listening port of your app
EXPOSE 1337

# [debugging] Show current folder structure in logs
# RUN pwd && ls -al

CMD [ "node", "server.js"]
