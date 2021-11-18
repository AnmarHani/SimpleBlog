            #Decorators Rest Framework#
from rest_framework.decorators import (api_view,permission_classes)
#---------------------------------------------------#
            #Response Rest Framework#
from rest_framework.response import Response
#---------------------------------------------------#
            #Permissions Rest Framework#
from rest_framework.permissions import (IsAuthenticated,AllowAny)
#---------------------------------------------------#
              #Token Rest Framework#
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
#---------------------------------------------------#
                      #User#
from Account.models import * 
from Account.serializers import *
from django.contrib.auth import logout
#---------------------------------------------------#
                      #User#

                    #REGISTER
@api_view(['POST'])
#Guest Can See
@permission_classes([AllowAny])

def Register(request):

  serializer = RegisterSerializer(data=request.data)

  data = {

  }
  
  if serializer.is_valid():
    myUser = serializer.save()
    data['response'] = 'Registered Succesfully!'
    data['username'] = myUser.username
    token = Token.objects.get(user=myUser).key
    user = MyUser.objects.filter(username=myUser.username).first()
    data['token'] = token
  else:
    data = serializer.errors
  
  return Response(data)

#---------------------------------------------------#
                      #LOGIN
@api_view(['POST'])
def Login(request):
  pass #already in urls.py

#---------------------------------------------------#
                      #LOGOUT
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def Logout(request):
    request.user.auth_token.delete()
    logout(request)

    return Response('User Logged out successfully')
