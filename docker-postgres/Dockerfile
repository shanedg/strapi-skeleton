FROM postgres:alpine

WORKDIR /docker-entrypoint-initdb.d

# run on db init (must be *.sql to get picked up and run)
COPY bootstrap-db.psql ./bootstrap-db.sql

# [todo]: mount volume for data persistence?

# [todo]: connected pgadmin container!
