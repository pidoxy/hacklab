from . import views
from django.urls import path

urlpatterns = [
    path('users', views.UserIO.as_view()),
    path('users/<int:pk>', views.RetrieveUserIO.as_view()),
    path('login/', views.LoginView.as_view())
]