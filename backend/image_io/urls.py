from . import views
from django.urls import path

urlpatterns = [
    path('', views.ImageIO.as_view(), name='upload_image'),
    path('<int:pk>', views.RetrieveImageIO.as_view(), name='get_image_par'),
]