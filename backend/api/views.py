from rest_framework.serializers import Serializer
from .serializers import *
from .models import User, Event
from rest_framework.renderers import JSONRenderer
from django.http import HttpResponse
from rest_framework.generics import ListAPIView,CreateAPIView,RetrieveAPIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import viewsets

from django.core.files.storage import default_storage

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


@csrf_exempt
def EventFunc(request, id=-1,):

    if request.method=='GET':
        #show all
        if(int(id) < 0):
            events = Event.objects.all()
            event_serializer = EventSerializer(events, many=True)
            return JsonResponse(event_serializer.data, safe=False)
        #show for specific id
        else:
            try:
                event = Event.objects.get(EventId = id)
                event_serializer = EventSerializer(event)
                return JsonResponse(event_serializer.data, safe=False)
            except:
                return JsonResponse("404", safe=False)

    elif request.method == 'POST':
        event_data = JSONParser().parse(request)
        events_serializer = EventSerializer(data=event_data)
        if events_serializer.is_valid():
            events_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Add fail", safe=False)

    elif request.method == 'PUT':
        event_data = JSONParser().parse(request)
        event = Event.objects.get(EventId = event_data['EventId'])
        events_serializer = EventSerializer(event, event_data)
        if events_serializer.is_valid():
            events_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Update fail", safe=False)

    elif request.method == 'DELETE':
        event = Event.objects.get(EventId=id)
        event.delete()
        return JsonResponse("delete success", safe=False)



@csrf_exempt
def SaveFile(request):
    file = request.FILES['myFile']
    file_name = default_storage.save(file.name, file)

    return JsonResponse(file_name, safe=False)
