# docker-api
## build api-only image
```
docker build --file docker-api/Dockerfile -t strapi-image-ok:api-only .
```
Note, build context aka the directory this command is run in must be the project root.

## run api-only container
```
docker run -d -p 1337:1337 --net use-custom-bridge-ok --name strapi-api-ok strapi-image-ok:api-only
```

## 