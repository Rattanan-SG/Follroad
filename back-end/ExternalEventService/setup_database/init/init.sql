create table if not exists external_events
(
  eid            int          not null
    primary key,
  title          varchar(256) not null,
  title_en       varchar(256) null,
  description    text         not null,
  description_en text         null,
  latitude       double       not null,
  longitude      double       not null,
  type           int          not null,
  start          datetime     not null,
  stop           datetime     not null,
  contributor    varchar(256) null,
  icon           varchar(256) null
);
