# strapi-skeleton

A quick description of strapi-skeleton.

## no-docker
### install
`npm install`

`npm install -g pm2`

### run
#### start postgres
`brew services start postgresql`

#### psql
```
CREATE DATABASE "local-strapi";
```

#### start strapi
`pm2-runtime start ecosystem.config.js`

## docker
### localhost
#### create docker bridge network for strapi and db to communicate over: 
`docker network create --driver bridge custom-bridge`

#### postgres:
##### get/run [postgres image](https://hub.docker.com/_/postgres/)/container: 
`docker pull postgres`
`docker run -d --name some-postgres --net custom-bridge postgres`

##### psql to configure postgres db for strapi
`docker run -it --rm --net custom-bridge postgres psql -h some-postgres -U postgres`
```
CREATE USER "strapi-user" WITH PASSWORD 'strapi-password';
CREATE DATABASE "some-strapi";
ALTER DATABASE "some-strapi" OWNER TO "strapi-user";
GRANT ALL PRIVILEGES ON DATABASE "some-strapi" TO "strapi-user";
```

#### build strapi image: 
`docker build -t strapi-skeleton .`

#### run strapi container, connecting to custom bridge and exposing port 1337 on container as port 1337 on localhost: 
`docker run -d -p 1337:1337 --net custom-bridge --name some-strapi strapi-skeleton`

#### view strapi application logs in container: 
`docker exec -it some-strapi pm2 log`

#### view strapi app: 
`localhost:1337`
`localhost:1337/admin`

### staging
TODO: 

### production
TODO: 

<!-- ## misc
`docker run -p 80:1337 strapi-skeleton` (standalone, for posterity, does not run because can't link up to db)
`docker exec -it some-strapi pm2 log`
`docker exec -it some-strapi pm2 ls`
`docker exec -it some-strapi pm2 monit` -->
