#!/bin/bash

echo "Current working directory: $(pwd)"
echo "Looking for .env file at: ../../.env"

set -a
source .env
set +a

if [[ -z "$DATABASE_USER" || -z "$DATABASE_PASSWORD" || -z "$DATABASE_HOST" || -z "$DATABASE_PORT" || -z "$DATABASE_NAME" ]]; then
  echo "One or more required environment variables are not set."
  exit 1
fi

DB_EXISTS=$(mysql -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" -h "$DATABASE_HOST" -P "$DATABASE_PORT" -e "SHOW DATABASES LIKE '$DATABASE_NAME';" | grep "$DATABASE_NAME")

if [ "$DB_EXISTS" ]; then
  echo "Database '$DATABASE_NAME' already exists. Skipping creation."
else
  mysql -u "$DATABASE_USER" -p"$DATABASE_PASSWORD" -h "$DATABASE_HOST" -P "$DATABASE_PORT" -e "CREATE DATABASE \`$DATABASE_NAME\`;"
  
  if [ $? -eq 0 ]; then
    echo "Database '$DATABASE_NAME' created successfully."
  else
    echo "Failed to create database '$DATABASE_NAME'."
    exit 1
  fi
fi