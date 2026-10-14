# NestJS Template API
This is a simple API template based on NestJS Framework

## Setup
1. Install dependencies
```sh
npm install 
```
2. Create local .env file and edit the values
```sh
cp .env.example .env
```
3. Create database and start server
```sh 
# Build Docker images
docker compose build --no-cache
# Create a docker image with database
docker compose up -d
# Start the server locally
npm run start:dev
```

## Migration & Seeding
That is for creation of database and filling it with data

## Scripts
```sh
#Create new migration script
npm run migration:create ./src/database/migrations/<NameOfMigration>
#Run all migrations
npm run migration:run
#Revert all migrations
npm run migration:revert
# Seed database with data
npm run seed
```
