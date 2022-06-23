from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.response import Response
from .models import Images
from rest_framework.exceptions import PermissionDenied
# from .simple_facerec import SimpleFacerec
from django.conf import settings

# Create your views here.

class ImageIO(generics.ListCreateAPIView):
    authentication_classes = ()
    permission_classes = ()

    queryset = Images.objects.all()
    serializer_class = ImageSerializer


class RetrieveImageIO(generics.RetrieveUpdateDestroyAPIView):
    queryset = Images.objects.all()
    serializer_class = ImageSerializer

    def post(self, request, *args, **kwargs):
        image = Images.objects.get(pk=self.kwargs["pk"])
        if not request.user == image.user:
            raise PermissionDenied("You can not create choice for this poll.")
        return super().post(request, *args, **kwargs)

# class VerifyImage(APIView):
#     def get(self, request, *args, **kwargs):
#         sfr = SimpleFacerec()
#         sfr.load_encoding_images(settings.MEDIA_URL+'images')

