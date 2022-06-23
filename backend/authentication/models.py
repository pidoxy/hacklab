from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import UserManager

#  Create your models here.
class User(AbstractUser):
    username = models.CharField('username', null=True, max_length=255)
    email = models.EmailField("email_address", unique=True)
    is_activated = models.BooleanField('activated', default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email