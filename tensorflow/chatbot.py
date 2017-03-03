import random

import numpy as np
import tensorflow as tf


def parseDialogueData(shuffle_pairs=True):
  """Returns dialogue pairs from the Cornell Movie dialogue dataset. Produces
     about 2.2 million of such pairs.
  
     In both files the field separator is " +++$+++ "
     
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
  
  with open('data/movie_lines.txt') as f:
    raw_movie_lines = f.readlines()
  
  movie_lines = {}
  for line in raw_movie_lines:
    line_items = line.split(' +++$+++ ')
    # Remove extra whitespaces, newlines and tabs, and replace right-sided
    # apostrophes with the regular single quotation mark
    txt = ' '.join(line_items[-1].split()).replace('\x92', "'")
    movie_lines[line_items[0]] = txt
  del raw_movie_lines  # just for memory usage improvement
  
  with open('data/movie_conversations.txt') as f:
    raw_movie_conversations = f.readlines()
  
  pairs = []
  for line in raw_movie_conversations:
    line_ids = eval(line.split(' +++$+++ ')[-1])
    for i in range(len(line_ids) - 1):
      self.pairs.append(
        (movie_lines[line_ids[i]], movie_lines[line_ids[i+1]]) )
  
  if shuffle_pairs:
    random.shuffle(pairs)
  return pairs


class Seq2SeqModel(object):
  """ADD DOCUMENTATION."""
  
  def __init(self):
    pass
