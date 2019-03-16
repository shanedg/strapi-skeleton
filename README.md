# strapi-skeleton

A quick description of strapi-skeleton.

[TODO] table of contents

## no-docker

### install

```bash
npm install
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

[todo] replace explicit local exports with `.env` file or similar?

first, set db test environment variables

```bash
export DATABASE_NAME=strapi-db
export DATABASE_USERNAME=strapi-user
export DATABASE_PASSWORD=strapi-user-alright
```

```bash
npm start
```

aka

```bash
node server.js
```

#### view strapi app

```bash
localhost:1337
localhost:1337/admin
```

#### teardown

`ctrl+c` to kill node process

[todo] other ways to kill node/ways that node might need to be killed
e.g. if daemonized/running in background

```bash
brew services stop postgresql
```

#### [advanced] using pm2 as a process manager

[todo] add motivation and caveats around using **pm2** or **forever.js**, etc.
especially re: official guidance against process managers in docker containers.

[todo] `ecosystem.config.js` vs `ecosystem.prod.config.js`

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 stop strapi-skeleton-dev
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

this custom postgres image bootstraps strapi user/db/permissions on init

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

```bash
docker pull postgres
```

```bash
docker run --name postgres-ok \
  --net strapi-db-bridge \
  -e POSTGRES_PASSWORD=pg-user-alright \
  -d postgres
```

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

#### run strapi container

connect to custom bridge network, expose port 1337 on container as port 1337 on localhost

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
docker logs strapi-ok
```

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
docker image rm strapi-postgres
docker image prune
```

### staging

[todo] heroku staging on `master` branch and review apps on PR's opened to same.

### production

`Dockerfile` image is more or less production-ready.

[todo] Caveats.
