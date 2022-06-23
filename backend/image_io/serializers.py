from rest_framework import serializers
from .models import Images
from authentication.serializers import UserSerializer

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'