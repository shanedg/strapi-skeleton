# staging

## build image

```bash
docker build --file docker-staging/Dockerfile -t strapi-staging .
```

## run container

```bash
docker run -d -p 1337:1337 --name strapi-staging-ok strapi-staging
```