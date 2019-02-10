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
psql postgres -f bootsrap-db.psql
```

#### start strapi

```bash
pm2 start ecosystem.config.js
```

#### view strapi app

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

#### create docker bridge network for strapi and db to communicate over

```bash
docker network create --driver bridge strapi-db-bridge
```

#### postgres

##### get/run [postgres image](https://hub.docker.com/_/postgres/)/container

```bash
docker pull postgres
```

```bash
docker run --name postgres-ok \
  --net strapi-db-bridge \
  -e POSTGRES_PASSWORD=pg-user-alright \
  -d postgres

```

##### psql to configure postgres db for strapi

```bash
docker run -it \
  --rm \
  --net strapi-db-bridge \
  postgres psql -h postgres-ok -U postgres
```

```psql
CREATE DATABASE "strapi-db";
CREATE USER "strapi-user" WITH ENCRYPTED PASSWORD 'strapi-user-alright';
ALTER USER "strapi-user" WITH SUPERUSER;
ALTER DATABASE "strapi-db" OWNER TO "strapi-user";
GRANT ALL ON DATABASE "strapi-db" TO "strapi-user";
```

*TODO:*

```bash
psql postgres -f bootstrap-db.psql
```

#### build strapi image

```bash
docker build -t strapi .
```

#### run strapi container, connecting to custom bridge network and exposing port 1337 on container as port 1337 on localhost

```bash
docker run -d \
  -p 1337:1337 \
  --net strapi-db-bridge \
  --name strapi-ok \
  strapi
```

#### view strapi application logs in container

```bash
docker exec -it strapi-ok pm2 log
```

```bash
docker exec -it strapi-ok pm2 monit
docker exec -it strapi-ok \
  pm2 restart ecosystem.prod.config.js --update-env
```

`--update-env` is optional and [reloads pm2 config](https://pm2.io/doc/en/runtime/guide/ecosystem-file/#updating-the-environment) in `ecosystem.config.js`

#### view docker strapi app

```bash
localhost:1337
localhost:1337/admin
```

#### teardown docker

```bash
docker container stop strapi-ok
docker container stop postgres-ok
docker container prune
docker network rm bridge strapi-db-bridge
docker network prune
docker image rm strapi
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
