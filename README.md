# strapi-skeleton

A quick description of strapi-skeleton.

## docker
`docker build -t strapi-skeleton .`
`docker pull postgres`
(very useful: https://hub.docker.com/_/postgres/)
`docker run --name some-postgres -d postgres`
configure:
`docker run -it --rm --link some-postgres:postgres postgres psql -h postgres -U postgres`
`CREATE DATABASE "strapi-skeleton";`


`docker run -p 80:1337 strapi-skeleton` (standalone, for posterity, does not run because can't link up to db)
`docker run --name strapi-skeleton-app -p 80:1337 --link some-postgres:postgres -d strapi-skeleton`

`docker exec -it strapi-skeleton-app pm2 log`
`docker exec -it strapi-skeleton-app pm2 ls`
`docker exec -it strapi-skeleton-app pm2 monit`

## install
`npm install`

`npm install -g pm2`

## run
### dev
`pm2-runtime start ecosystem.config.js`


### staging
TODO:
`pm2-runtime start ecosystem.config.js --env staging`


### production
TODO:
`pm2-runtime start ecosystem.config.js --env production`