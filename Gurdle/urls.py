"""
URL configuration for Gurdle project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Gurdle import views
from .utils import get_random_word_at_length

urlpatterns = [
    path('', views.gurdle, name='gurdle'),
    path('get_random_word_at_length/<int:length>/', views.generate_word_and_render, name='generate_word_and_render'),
    path('admin/', admin.site.urls),
]
