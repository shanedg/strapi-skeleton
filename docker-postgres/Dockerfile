FROM postgres:latest

WORKDIR /docker-entrypoint-initdb.d

# run on db init
COPY bootstrap-db.psql ./bootstrap-db.sql

# [TODO]: mount volume for data persistence?

# [TODO]: connected pgadmin container!
