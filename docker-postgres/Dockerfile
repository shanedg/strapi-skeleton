FROM postgres:alpine

# add sql bootstrap scripts in dir:
# /docker-entrypoint-initdb.d/
WORKDIR /docker-entrypoint-initdb.d

# should get run on db init
COPY bootstrap-db-docker.psql .

# TODO: mount volume for data persistence
# TODO: option to run strapi db bootstrap psql commands

# TODO: connected pgadmin container!!
