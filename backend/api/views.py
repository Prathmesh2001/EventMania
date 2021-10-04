from rest_framework.serializers import Serializer
from .serializers import UserSerializer
from .models import User
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from rest_framework.generics import ListAPIView,CreateAPIView,RetrieveAPIView

# Create your views here.

class UserList(ListAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class UserCreate(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

def UserRetrieve(request,email):
    user=User.objects.filter(email=email).first()
    if user!=None:
        serializer=UserSerializer(user)
        json_data=JSONRenderer().render(serializer.data)
        return HttpResponse(json_data,content_type='application/json')
    else:
        invalid={'msg':'invalid_user'}
        json_data=JSONRenderer().render(invalid)
        return HttpResponse(json_data,content_type='application/json')


