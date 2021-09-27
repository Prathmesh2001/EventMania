from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['user_id','email','password']