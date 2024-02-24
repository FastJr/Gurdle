from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def gurdle(request):
    return render(request, 'gurdle.html')
