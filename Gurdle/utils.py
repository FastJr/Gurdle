import random
import os
module_dir = os.path.dirname(__file__)  # get current directory
file_path = os.path.join("gurdle/wlist_match11.txt")
from urllib.request import urlopen

#old method

# mit_website_text = urlopen("https://www.mit.edu/~ecprice/wordlist.10000").read()
# WORDS = mit_website_text.splitlines()
# decoded_words = [word.decode('utf-8') for word in WORDS]
with open(file_path, 'r') as file:
    # Read the contents of the file
    word_list = file.read()

decoded_words = word_list.splitlines()

def get_random_word(words_list):
    return random.choice(words_list)

def get_random_word_at_length(length):
    list_at_length = []
    for word in decoded_words:
        if len(word) == length:
            list_at_length.append(word)
    return random.choice(list_at_length)

def get_decoded_words():
    return decoded_words

def isRealWord(targ_word):
    for word in decoded_words:
        if targ_word == word:
            return True
        
    return False