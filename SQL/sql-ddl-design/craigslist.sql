
DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  encrypted_password TEXT NOT NULL,
  preferred_region_id INTEGER REFERENCES regions(id)
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE posts
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  location TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  region_id INTEGER NOT NULL REFERENCES regions(id),
  category_id INTEGER NOT NULL REFERENCES categories(id)
);

INSERT INTO regions
  (name)
VALUES
  ('San Francisco'),
  ('Atlanta'),
  ('Seattle'),
  ('New York'),
  ('Los Angeles');

INSERT INTO users
  (username, encrypted_password, preferred_region_id)
VALUES
  ('john_doe', 'hashed_password_123', 1),
  ('sarah_smith', 'hashed_password_456', 2),
  ('mike_wilson', 'hashed_password_789', 3),
  ('lisa_garcia', 'hashed_password_abc', 4),
  ('david_brown', 'hashed_password_def', 5);

INSERT INTO categories
  (name)
VALUES
  ('For Sale'),
  ('Housing'),
  ('Jobs'),
  ('Services'),
  ('Community'),
  ('Gigs');

INSERT INTO posts
  (title, text, location, user_id, region_id, category_id)
VALUES
  ('iPhone 12 for sale - excellent condition', 'Selling my iPhone 12, 128GB, black. No scratches, comes with original box and charger. $500 OBO.', 'Downtown', 1, 1, 1),
  ('2BR apartment in Mission District', 'Beautiful 2 bedroom apartment available for rent. $2800/month, utilities included. Available immediately.', 'Mission District', 2, 1, 2),
  ('Software Engineer needed - remote work', 'Looking for experienced React developer. Full-time position, competitive salary. Send resume to jobs@company.com', 'Remote', 3, 3, 3),
  ('House cleaning service', 'Professional house cleaning available. $25/hour, reliable and thorough. References available.', 'East Bay', 4, 1, 4),
  ('Free moving boxes', 'Have about 20 moving boxes to give away. Pick up only in Oakland. First come, first served.', 'Oakland', 5, 1, 5),
  ('Guitar lessons - experienced teacher', 'Guitar lessons for all levels. $40/hour, can travel to your home. 10 years teaching experience.', 'North Side', 1, 2, 4); 