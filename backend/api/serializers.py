from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['user_id','full_name','email','password']


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('EventId', 
                'EventName',
                'EventDescription',
                'DateOfEvent',
                'EventVenue',
                'EventCost',
                'EventPhotoName')
