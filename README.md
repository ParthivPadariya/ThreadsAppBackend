GraphQL -> https://www.apollographql.com/docs/apollo-server/api/express-middleware/
Prisma -> https://www.prisma.io/docs/getting-started/quickstart

Postgres Setup in Docker -> https://geshan.com.np/blog/2021/12/docker-postgres/

WorkFolw of Our Project 
![Architecture](https://github.com/ParthivPadariya/ThreadsAppBackend/assets/110293923/e257aeed-cd9d-465f-8c24-1f9f532c7a42)

In this Project Learn Context in GraphQL


installation step

1) npm init -> crate node js Project
2) install express, @apollo/server, graphql, typescript
3) npx tsc --init -> create typescript configration file
    |-> change in rootDir(where our poject file Place), outDir(Where Our Build File Place Afte build)
4) npm install tsc-watch -D (Add tsc-watch as a Dev Dependancy for run typscript file)
5) change in package.json script
    |-> "script" : {
       "start" : "node bild/index.js",
       "dev": "tsc-watch --onSuccess \"npm start\""
    }

6) docker-compose.yml  => cmd docker compose up -d
   version: '3.4'

   services:
     postgres:
       container_name: thread-db
       image: postgres
       port:
         - 5432:5432
       volume:
         - postgres_data:/var/lib/postgressql/data
      environment:
       POSTGRES_USER: postgres
       POSTGRES_DB: threads
       POSTGRES_PASSWORD: parthiv
       
   volume:
   postgres_data

7) After changing in prisma file run this command => prisma migrate --name "message_any_thing" 
