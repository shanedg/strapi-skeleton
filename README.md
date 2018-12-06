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
```sql
CREATE DATABASE "local-strapi";
GRANT ALL PRIVILEGES ON DATABASE "local-strapi" TO shane;
```
Note where mine is `shane`, your default user will most likely be your username. Be sure to update that value in `config/environments/development/database.json` under `connections.default.settings.username`.

If your user is not already `SUPERUSER`:
```sql
ALTER USER shane WITH SUPERUSER;
```

If you suspect your postgres database may be corrupt or otherwise misconfigured, run the following and then re-run the commands above to start fresh.
```sql
DROP DATABASE IF EXISTS "local-strapi";
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
docker run -d --name use-postgres-ok --net use-custom-bridge-ok postgres
```

##### psql to configure postgres db for strapi
```bash
docker run -it --rm --net use-custom-bridge-ok postgres psql -h use-postgres-ok -U postgres
```
```sql
CREATE USER "strapi-user-ok" WITH PASSWORD 'strapi-password-alright';
CREATE DATABASE "strapi-db-ok";
ALTER DATABASE "strapi-db-ok" OWNER TO "strapi-user-ok";
GRANT ALL PRIVILEGES ON DATABASE "strapi-db-ok" TO "strapi-user-ok";
ALTER USER "strapi-user-ok" WITH SUPERUSER;
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

#### view strapi app: 
```bash
localhost:1337
localhost:1337/admin
```

#### teardown
```bash
docker container stop strapi-container-ok
docker container stop use-postgres-ok
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
