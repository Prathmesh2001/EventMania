from django.db import models
from django.db.models.base import Model

# Create your models here. 
class User(models.Model):
    user_id=models.AutoField(primary_key=True)
    full_name=models.CharField(max_length=50, null = True)
    email=models.EmailField()
    password = models.CharField(max_length=50)
    UserPhotoName = models.CharField(max_length=200, null = True)

class Event(models.Model):
    EventId = models.AutoField(primary_key=True)
    EventName = models.CharField(max_length=100)
    EventDescription = models.CharField(max_length=1000)
    DateOfEvent = models.DateTimeField()
    EventVenue = models.CharField(max_length=200)
    EventCost = models.IntegerField()
    EventPhotoName = models.ImageField()
    def __str__(self):
        return self.EventName
