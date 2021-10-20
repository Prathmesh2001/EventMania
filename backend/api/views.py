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
import io
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
        s = "Add fail"+str(events_serializer.data)
        return JsonResponse(s, safe=False)

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
def SaveFile(request, id = -1):
    file = request.FILES['myFile']
    # print(file.name)
    fname = "user"+str(id)+"."+file.name.split(".")[1]
    if(default_storage.exists(fname)):
        default_storage.delete(fname)
    file_name = default_storage.save(fname, file)

    return JsonResponse(file_name, safe=False)

@csrf_exempt
def UserFunc(request, id = -1):
    if request.method == "GET":
        if id!=-1:
            try:
                stu = User.objects.get(user_id=id)
                user_serializer = UserSerializer(stu)
                return JsonResponse(user_serializer.data, safe=False)
            except:
                return JsonResponse("does_not_exist", safe=False)
        else:
            return JsonResponse("No id provided", safe=False)
    
    elif request.method=="POST":
        json_data=request.body
        stream=io.BytesIO(json_data)
        user_data=JSONParser().parse(stream)
        user_serializer=UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Data Posted", safe=False)
        return JsonResponse(user_serializer.errors, safe=False)     
        
    elif request.method=="PUT":
        print("came here")
        # json_data=request.body
        # stream=io.BytesIO(json_data)
        user_data=JSONParser().parse(request)
        # id=user_data.get('id')
        stu=User.objects.get(user_id=id)
        print(id, stu)
        user_serializer=UserSerializer(stu,data=user_data,partial=True)
        # print(user_serializer.data())
        if user_serializer.is_valid():
            print("valid")
            user_serializer.save()
            return JsonResponse("Data Updated", safe=False)
        return JsonResponse("problem bro", safe=False)   
