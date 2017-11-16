CREATE TABLE tweets(
  id SERIAL PRIMARY KEY,
  tweet_json jsonb NOT NULL
);
CREATE TABLE users(
  id_str VARCHAR PRIMARY KEY
);
