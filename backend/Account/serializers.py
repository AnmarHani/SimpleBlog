from rest_framework import serializers
from .models import MyUser

class RegisterSerializer(serializers.ModelSerializer):
  password2 = serializers.CharField(style={'input_field': 'password'}, write_only=True)
  class Meta:
    model = MyUser
    fields = ['id','username','password', 'password2']
    extra_kwargs = {
      'password': {'write_only': True}
    }
  def save(self):
    account = MyUser(username=self.validated_data['username'])
    password = self.validated_data['password']
    password2 = self.validated_data['password2']

    if password != password2:
      raise serializers.ValidationError({'Register Error': 'Passwords Do Not Match'})
    account.set_password(password)
    account.save()
    return account