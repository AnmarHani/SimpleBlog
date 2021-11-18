from django.urls import path, include
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
  path('Register/', views.Register, name="Register"),
  path('Login/', obtain_auth_token, name="Login"),
  path('Logout/',views.Logout,name='logout'),

  path('', include('Blogs.urls')),
]