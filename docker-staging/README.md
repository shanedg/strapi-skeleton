# staging

## build image

```bash
docker build --file docker-staging/Dockerfile -t strapi-staging-image-ok .
```

## run container

```bash
docker run -d -p 1337:1337 --name strapi-staging-container-ok strapi-staging-image-ok
```