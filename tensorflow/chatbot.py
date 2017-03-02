import numpy as np
import tensorflow as tf


class DataParser(object):
  """ADD DOCUMENTATION.
  
  In all files the field separator is " +++$+++ "

  - movie_titles_metadata.txt
    - contains information about each movie title
    - fields: 
      - movieID, 
      - movie title,
      - movie year, 
        - IMDB rating,
      - no. IMDB votes,
      - genres in the format ['genre1','genre2',...,'genreN']

  - movie_characters_metadata.txt
    - contains information about each movie character
    - fields:
      - characterID
      - character name
      - movieID
      - movie title
      - gender ("?" for unlabeled cases)
      - position in credits ("?" for unlabeled cases) 

  - movie_lines.txt
    - contains the actual text of each utterance
    - fields:
      - lineID
      - characterID (who uttered this phrase)
      - movieID
      - character name
      - text of the utterance

  - movie_conversations.txt
    - the structure of the conversations
    - fields
      - characterID of the first character involved in the conversation
      - characterID of the second character involved in the conversation
      - movieID of the movie in which the conversation occurred
      - list of the utterances that make the conversation, in chronological 
        order: ['lineID1','lineID2',...,'lineIDN']; has to be matched with
        movie_lines.txt to reconstruct the actual content"""
  
  def __init__(self):
    pass
  

class Seq2SeqModel(object):
  """ADD DOCUMENTATION."""
  
  def __init(self):
    pass



