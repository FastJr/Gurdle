import random
from urllib.request import urlopen

mit_website_text = urlopen("https://www.mit.edu/~ecprice/wordlist.10000").read()
WORDS = mit_website_text.splitlines()
decoded_words = [word.decode('utf-8') for word in WORDS]

def get_random_word(words_list):
    return random.choice(words_list)

def get_random_word_at_length(length):
    list_at_length = []
    for word in decoded_words:
        if len(word) == length:
            list_at_length.append(word)
    return random.choice(list_at_length)