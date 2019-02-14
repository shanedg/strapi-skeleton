FROM postgres:alpine

WORKDIR /docker-entrypoint-initdb.d

# run on db init (must be *.sql to get picked up and run)
COPY bootstrap-db.psql ./bootstrap-db.sql

# [TODO]: mount volume for data persistence?

# [TODO]: connected pgadmin container!
