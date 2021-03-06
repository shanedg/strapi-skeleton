# docker-api

the strapi api's do not require the admin and plugins ecosystem to respond to requests.
here we can shave maybe 100 MB off of the resulting image by only including the api's.

for high request volumes, we can scale instances of this container.
this is desirable both for space savings (>40%) and reduced complexity.

## build api-only image

from project root

```bash
docker build --file docker-api/Dockerfile -t strapi-api .
```

Note, the directory that this command is run from must be the build context.
i.e. running `docker build` from `docker-api/` will create path problems.

[todo] research around and motivation for running build from project root.

## run api-only container

```bash
docker run -d \
  -p 1337:1337 \
  --net strapi-db-bridge \
  --name strapi-api-ok \
  -e DATABASE_HOST=postgres-ok \
  -e DATABASE_NAME=strapi-db \
  -e DATABASE_USERNAME=strapi-user \
  -e DATABASE_PASSWORD=strapi-user-alright \
  strapi-api
```
