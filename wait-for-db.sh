#!/bin/sh
until nc -z -v -w30 mysql-db 3306
do
  echo "Waiting for database connection..."
  sleep 1
done
echo "Database is up - executing command"
exec "$@"
