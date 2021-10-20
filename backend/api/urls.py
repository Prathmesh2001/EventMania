from django.urls import path
from django.conf.urls import include, url
from api import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('list/', views.UserList.as_view()),
    path('create/', views.UserCreate.as_view()),
    url(r'^user$', views.UserFunc),
    url(r'^user/([0-9]+)$', views.UserFunc),
    url(r'^user/SaveFile/([0-9]+)$', views.SaveFile),
    url(r'^event$', views.EventFunc),
    path('retrieve/<str:email>', views.UserRetrieve),
    url(r'^event/([0-9]+)$', views.EventFunc),

    url(r'^event/SaveFile$', views.SaveFile),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



 
