# strapi-skeleton

A quick description of strapi-skeleton.

## no-docker
### install
```bash
npm install
npm install -g pm2
```

### run
#### start postgres
```bash
brew services start postgresql
```

#### psql
run commands to ready postgres db
```bash
psql -f bootsrap-db-local.psql
```

#### start strapi
```bash
pm2 start ecosystem.config.js --only strapi-skeleton-dev
```

#### view strapi app: 
```bash
localhost:1337
localhost:1337/admin
```

#### teardown
```bash
pm2 stop strapi-skeleton-dev
brew services stop postgresql
pm2 kill
```

## docker
### localhost
#### create docker bridge network for strapi and db to communicate over: 
```bash
docker network create --driver bridge use-custom-bridge-ok
```

#### postgres:
##### get/run [postgres image](https://hub.docker.com/_/postgres/)/container: 
```bash
docker pull postgres
docker run -d --name postgres-container-ok --net use-custom-bridge-ok postgres
```

##### psql to configure postgres db for strapi
```bash
docker run -it --rm --net use-custom-bridge-ok postgres psql -h postgres-container-ok -U postgres
```
```psql
CREATE DATABASE "docker-db-ok";
ALTER DATABASE "docker-db-ok" OWNER TO "docker-user-ok";
CREATE USER "docker-user-ok" WITH PASSWORD 'docker-password-alright';
ALTER USER "docker-user-ok" WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE "docker-db-ok" TO "docker-user-ok";
```
*TODO:*
```bash
psql -f bootstrap-db-docker.psql
```

#### build strapi image: 
```bash
docker build -t strapi-image-ok .
```

#### run strapi container, connecting to custom bridge network and exposing port 1337 on container as port 1337 on localhost: 
```bash
docker run -d -p 1337:1337 --net use-custom-bridge-ok --name strapi-container-ok strapi-image-ok
```

#### view strapi application logs in container:
```bash
docker exec -it strapi-container-ok pm2 log
```
```bash
docker exec -it strapi-container-ok pm2 monit
docker exec -it strapi-container-ok pm2 restart ecosystem.config.js --update-env --only strapi-skeleton-dev --env localdocker
```
`--update-env` is optional and [reloads pm2 config](https://pm2.io/doc/en/runtime/guide/ecosystem-file/#updating-the-environment) in `ecosystem.config.js`

#### view strapi app: 
```bash
localhost:1337
localhost:1337/admin
```

#### teardown
```bash
docker container stop strapi-container-ok
docker container stop postgres-container-ok
docker container prune
docker network rm bridge use-custom-bridge-ok
docker network prune
docker image rm strapi-image-ok
docker image prune
```

### staging
TODO: 

### production
TODO: 

<!-- ## misc
standalone, does not run because can't link up to db:
```bash
docker run -p 80:1337 strapi-skeleton
```
```bash
docker exec -it some-strapi pm2 log
docker exec -it some-strapi pm2 ls
docker exec -it some-strapi pm2 monit
```
-->
