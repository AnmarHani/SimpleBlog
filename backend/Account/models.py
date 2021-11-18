from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class MyUserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('Please Choose A Username')

        user = self.model(
            username=username,
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username, password=None):

        user = self.create_user(
            username=username,
        )
        user.set_password(password)
        user.is_admin = True
        user.save()
        return user


class MyUser(AbstractBaseUser):
    username = models.CharField(unique=True,max_length=150)
    password = models.CharField(unique=True,max_length=150)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager() 

    USERNAME_FIELD = 'username' #LOGIN_FIELD

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False,**kwargs):
  if created:
    #Create Token
    Token.objects.create(user=instance)