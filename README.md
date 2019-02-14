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

[TODO] replace explicit local exports with `.env` file or similar?

first, set db test environment variables

```bash
export DATABASE_NAME=strapi-db
export DATABASE_USERNAME=strapi-user
export DATABASE_PASSWORD=strapi-user-alright
```

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

##### customize [postgres image](https://hub.docker.com/_/postgres/)

specifically, our custom postgres image bootstraps strapi user/db/permissions on init

```bash
docker build --file docker-postgres/Dockerfile -t strapi-postgres .
```

```bash
docker run --name postgres-ok \
  --net strapi-db-bridge \
  -e POSTGRES_PASSWORD=pg-user-alright \
  -d strapi-postgres
```

##### optional: run canonical/other postgres container

###### get image and run

```bash
docker pull postgres
```

```bash
docker run --name postgres-ok \
  --net strapi-db-bridge \
  -e POSTGRES_PASSWORD=pg-user-alright \
  -d postgres
```

###### psql to configure postgres db for strapi

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
  -e DATABASE_HOST=postgres-ok \
  -e DATABASE_NAME=strapi-db \
  -e DATABASE_USERNAME=strapi-user \
  -e DATABASE_PASSWORD=strapi-user-alright \
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

[TODO] notes specific to heroku staging on `master` branch and review apps on PR's opened to `master`.

### production

`Dockerfile` image is more or less production-ready.

[TODO] Caveats.

<!-- ## misc
```bash
docker exec -it some-strapi pm2 log
docker exec -it some-strapi pm2 ls
docker exec -it some-strapi pm2 monit
```
-->
