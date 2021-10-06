from django.urls import path
from django.conf.urls import include, url
from api import views

from django.conf.urls.static import static
from django.conf import settings

# from rest_framework import routers


# route = routers.DefaultRouter()
# route.register("", views.EventFunc, basename='EventFunc')

urlpatterns = [
    path('list/', views.UserList.as_view()),
    path('create/', views.UserCreate.as_view()),
    url(r'^event$', views.EventFunc),
    # path('event/', include(route.urls)),
    url(r'^event/([0-9]+)$', views.EventFunc),

    url(r'^event/SaveFile$', views.SaveFile),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



