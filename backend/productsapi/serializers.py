from rest_framework import serializers
from .models import *

class ProductSerializaer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'