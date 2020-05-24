drop table public."User" cascade;
drop table public."FriendStatus" cascade;
drop table public."Post" cascade;
drop table public."Profile" cascade;
drop type "Gender";
drop view friendships;

create type "Gender" as enum('FEMALE', 'MALE', 'OTHER');

create table "public"."User"
(
    id             serial primary key  not null,
    "firstName"    varchar(255)        not null,
    "lastName"     varchar(255)        not null,
    email          varchar(255) unique not null,
    "passwordHash" varchar(255)        not null,
    birthday       date                not null,
    gender         "Gender"            not null
);

create table "public"."FriendStatus"
(
    id serial primary key not null,
    "fromUserId" integer unique not null,
    foreign key ("fromUserId") references "public"."User" (id),
    "toUserId" integer unique not null,
    foreign key ("toUserId") references "public"."User" (id),
    "statusId" integer not null default 2,
    "sentTime" timestamp not null default now(),
    "responseTime" timestamp
);


create view friendships as
    select distinct "fromUserId", "toUserId" from public."FriendStatus" where "statusId" = 1
    union
    select distinct "toUserId", "fromUserId" from public."FriendStatus" where "statusId" = 1;

create table "public"."Post"
(
    id          serial primary key not null,
    content     text,
    "createdAt" timestamp          not null default now(),
    "authorId"  integer            not null,
    foreign key ("authorId") references "public"."User" (id)
);

create table "public"."Profile"
(
    id       serial primary key not null,
    bio      text,
    "userId" integer unique      not null,
    foreign key ("userId") references "public"."User" (id)
);
