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
GRANT ALL PRIVILEGES ON DATABASE "local-strapi" TO shane;
```
Note where mine is `shane`, your default user will most likely be your username.

If you suspect your postgres database may be corrupt or otherwise misconfigured, run the following and then re-run the commands above to start fresh.
```
DROP DATABASE IF EXISTS "local-strapi";
```

#### start strapi
`pm2-runtime start ecosystem.config.js`

## docker
### localhost
#### create docker bridge network for strapi and db to communicate over: 
`docker network create --driver bridge use-custom-bridge-ok`

#### postgres:
##### get/run [postgres image](https://hub.docker.com/_/postgres/)/container: 
`docker pull postgres`
`docker run -d --name use-postgres-ok --net use-custom-bridge-ok postgres`

##### psql to configure postgres db for strapi
`docker run -it --rm --net use-custom-bridge-ok postgres psql -h use-postgres-ok -U postgres`
```
CREATE USER "strapi-user-ok" WITH PASSWORD 'strapi-password-alright';
CREATE DATABASE "strapi-db-ok";
ALTER DATABASE "strapi-db-ok" OWNER TO "strapi-user-ok";
GRANT ALL PRIVILEGES ON DATABASE "strapi-db-ok" TO "strapi-user-ok";
```

#### build strapi image: 
`docker build -t strapi-image-ok .`

#### run strapi container, connecting to custom bridge and exposing port 1337 on container as port 1337 on localhost: 
`docker run -d -p 1337:1337 --net use-custom-bridge-ok --name strapi-container-ok strapi-image-ok`

#### view strapi application logs in container: 
`docker exec -it strapi-container-ok pm2 log`

#### view strapi app: 
`localhost:1337`
`localhost:1337/admin`

### staging
TODO: 

### production
TODO: 

<!-- ## misc
`docker run -p 80:1337 strapi-skeleton` (standalone, does not run because can't link up to db)
`docker exec -it some-strapi pm2 log`
`docker exec -it some-strapi pm2 ls`
`docker exec -it some-strapi pm2 monit` -->
