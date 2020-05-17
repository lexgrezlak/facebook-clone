DROP TABLE public."User" CASCADE;
DROP TABLE public."Post" CASCADE;
DROP TABLE public."Profile" CASCADE;

CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL
);

CREATE TABLE "public"."Post" (
  id SERIAL PRIMARY KEY NOT NULL,
  content TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "authorId" INTEGER NOT NULL,
  FOREIGN KEY ("authorId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Profile" (
  id SERIAL PRIMARY KEY NOT NULL,
  bio TEXT,
  "userId" INTEGER UNIQUE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);
