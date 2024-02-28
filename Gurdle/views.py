from django.shortcuts import render
from django.http import HttpResponse
from urllib.request import urlopen

mit_website_text = urlopen("https://www.mit.edu/~ecprice/wordlist.10000").read()
WORDS = mit_website_text.splitlines()
for i in range(len(WORDS)):
    print(WORDS[i].decode('utf-8'))

# Create your views here.
def gurdle(request):
    return render(request, 'gurdle.html')
