import random

def get_random_word(words_list):
    return random.choice(words_list)

def get_random_word_at_length(words_list, length):
    list_at_length = []
    for word in words_list:
        if len(word) == length:
            list_at_length.append(word)
    return random.choice(list_at_length)