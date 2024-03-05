from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from urllib.request import urlopen
from .utils import get_random_word_at_length, get_decoded_words

# Create your views here.
def gurdle(request):
    return render(request, 'gurdle.html', {'range': range(7)})

def generate_word_and_render(request, length):
    word = get_random_word_at_length(length)
    decoded_words = get_decoded_words()
    print(word)
    return JsonResponse({'word': word, 'decoded_words': decoded_words})