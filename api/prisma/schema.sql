drop table public."User" cascade;
drop table public."FriendStatus" cascade;
drop table public."Post" cascade;
drop table public."Profile" cascade;
drop type "Gender";

create type "Gender" as enum('FEMALE', 'MALE', 'OTHER');

create table "public"."User"
(
    id             serial primary key  not null,
    "firstName"    varchar(255)        not null,
    "lastName"     varchar(255)        not null,
    email          varchar(255) unique not null,
    "passwordHash" varchar(255)        not null,
    birthday       date                not null,
    gender         "Gender"            not null,
    profilePicture varchar(255),
    backgroundPicture varchar(255),
);

create table "public"."FriendStatus"
(
    id serial primary key not null,
    "fromUserId" integer not null,
    foreign key ("fromUserId") references "public"."User" (id),
    "toUserId" integer not null,
    foreign key ("toUserId") references "public"."User" (id),
    "statusId" integer not null default 2,
    "sentTime" timestamp not null default now(),
    "responseTime" timestamp
);


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
