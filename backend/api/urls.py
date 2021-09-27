from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.UserList.as_view()),
    path('create/', views.UserCreate.as_view()),
]