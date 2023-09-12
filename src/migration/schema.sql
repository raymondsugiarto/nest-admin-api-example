create table user
(
    id          bigserial    not null constraint user_pkey primary key,
    username   varchar(255) not null,
    fullname varchar(255) not null,
    email      varchar(255) not null,
    password      varchar(255) not null,
    photo      text
);