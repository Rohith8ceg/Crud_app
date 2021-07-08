from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=70, blank=False, default='', unique=True)
    email = models.CharField(max_length=50, blank=False, default='')
    password = models.CharField(max_length=350, blank=False, default='')
    role = models.CharField(max_length=200, blank=False, default='')
    name = models.CharField(max_length=50,blank=False, default='')
    
    class Meta:
        db_table = 'auth_user'