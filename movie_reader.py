"""Script to read the products CSV, parse the data, and output the results to
   a JSON file. This allows the products to be inserted in the Mongo databse in
   the webapp. For convenience all the data is kept in the ignored `data`
   directory that lives inside the `tensorflow` directory."""

import pandas as pd


df = pd.read_csv('tensorflow/data/movie_metadata.csv')

df['likes'] = df['director_facebook_likes'] + df['actor_1_facebook_likes'] + \
              df['actor_2_facebook_likes'] + df['actor_3_facebook_likes'] + \
              df['cast_total_facebook_likes'] + df['movie_facebook_likes']

df['genres'] = df['genres'].str.split('|')
df['plot_keywords'] = df['plot_keywords'].str.split('|')
df['actors'] = (df['actor_1_name'] + '|' + df['actor_2_name'] + '|' + \
                df['actor_3_name']).str.split('|')

relevant_df = df[[
  'director_name',
  'duration',
  'likes',
  'actors',
  'genres',
  'movie_title',
  'plot_keywords',
  'country',
  'content_rating',
  'title_year',
  'imdb_score',
]]

with open('tensorflow/data/movie_metadata.json', 'w') as f:
  f.write(relevant_df.reset_index().to_json(orient='records'))
