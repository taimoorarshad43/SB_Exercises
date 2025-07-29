-- from the terminal run:
-- psql < soccer_league.sql

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE players
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  birthday DATE NOT NULL,
  height INTEGER NOT NULL,
  current_team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE referees
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE seasons
(
  id SERIAL PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE matches
(
  id SERIAL PRIMARY KEY,
  home_team_id INTEGER NOT NULL REFERENCES teams(id),
  away_team_id INTEGER NOT NULL REFERENCES teams(id),
  location TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  season_id INTEGER NOT NULL REFERENCES seasons(id),
  head_referee_id INTEGER NOT NULL REFERENCES referees(id),
  assistant_referee_1_id INTEGER NOT NULL REFERENCES referees(id),
  assistant_referee_2_id INTEGER NOT NULL REFERENCES referees(id)
);

CREATE TABLE goals
(
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL REFERENCES players(id),
  match_id INTEGER NOT NULL REFERENCES matches(id)
);

CREATE TABLE lineups
(
  id SERIAL PRIMARY KEY,
  player_id INTEGER NOT NULL REFERENCES players(id),
  match_id INTEGER NOT NULL REFERENCES matches(id),
  team_id INTEGER NOT NULL REFERENCES teams(id)
);

CREATE TABLE results
(
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES teams(id),
  match_id INTEGER NOT NULL REFERENCES matches(id),
  result TEXT NOT NULL CHECK (result IN ('win', 'loss', 'draw'))
);

INSERT INTO teams
  (name, city)
VALUES
  ('Red Dragons', 'New York'),
  ('Blue Thunder', 'Los Angeles'),
  ('Green Eagles', 'Chicago'),
  ('Yellow Lions', 'Miami'),
  ('Purple Knights', 'Seattle');

INSERT INTO players
  (name, birthday, height, current_team_id)
VALUES
  ('Alex Rodriguez', '1995-03-15', 175, 1),
  ('Sarah Johnson', '1993-07-22', 168, 1),
  ('Mike Wilson', '1990-11-08', 182, 2),
  ('Lisa Garcia', '1992-04-30', 165, 2),
  ('David Brown', '1988-09-12', 180, 3),
  ('Emma Davis', '1994-01-25', 170, 3),
  ('James Smith', '1991-06-18', 178, 4),
  ('Maria Lopez', '1996-12-03', 163, 4),
  ('Robert Chen', '1989-08-14', 185, 5),
  ('Jennifer Park', '1993-05-07', 167, 5);

INSERT INTO referees
  (name)
VALUES
  ('John Thompson'),
  ('Mary Williams'),
  ('Robert Davis'),
  ('Lisa Anderson'),
  ('Michael Johnson');

INSERT INTO seasons
  (start_date, end_date)
VALUES
  ('2024-03-01', '2024-11-30'),
  ('2023-03-01', '2023-11-30');

INSERT INTO matches
  (home_team_id, away_team_id, location, date, start_time, season_id, head_referee_id, assistant_referee_1_id, assistant_referee_2_id)
VALUES
  (1, 2, 'Central Stadium', '2024-03-15', '19:00:00', 1, 1, 2, 3),
  (3, 4, 'Sports Complex', '2024-03-16', '15:30:00', 1, 2, 3, 4),
  (5, 1, 'Downtown Arena', '2024-03-22', '20:00:00', 1, 3, 4, 5),
  (2, 3, 'City Field', '2024-03-23', '16:00:00', 1, 4, 5, 1),
  (4, 5, 'Community Stadium', '2024-03-29', '18:30:00', 1, 5, 1, 2);

INSERT INTO goals
  (player_id, match_id)
VALUES
  (1, 1),
  (3, 1),
  (1, 1),
  (5, 2),
  (7, 2),
  (9, 3),
  (2, 3),
  (4, 4),
  (6, 4),
  (8, 5);

INSERT INTO lineups
  (player_id, match_id, team_id)
VALUES
  (1, 1, 1),
  (2, 1, 1),
  (3, 1, 2),
  (4, 1, 2),
  (5, 2, 3),
  (6, 2, 3),
  (7, 2, 4),
  (8, 2, 4),
  (9, 3, 5),
  (10, 3, 5),
  (1, 3, 1),
  (2, 3, 1);

INSERT INTO results
  (team_id, match_id, result)
VALUES
  (1, 1, 'win'),
  (2, 1, 'loss'),
  (3, 2, 'win'),
  (4, 2, 'loss'),
  (5, 3, 'win'),
  (1, 3, 'loss'),
  (2, 4, 'win'),
  (3, 4, 'loss'),
  (4, 5, 'win'),
  (5, 5, 'loss'); 