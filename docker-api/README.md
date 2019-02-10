# docker-api

## build api-only image

```bash
docker build --file docker-api/Dockerfile -t strapi:api-only .
```

Note, build context aka the directory this command is run in must be the project root.

## run api-only container

```bash
docker run -d -p 1337:1337 --net strapi-db-bridge --name strapi-api-ok strapi:api-only
```
