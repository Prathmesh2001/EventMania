from .serializers import UserSerializer
from .models import User
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView

# Create your views here.

class UserList(ListAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class UserCreate(CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer