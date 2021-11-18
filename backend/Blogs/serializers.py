from rest_framework import serializers
from .models import *

class BlogSerializer(serializers.ModelSerializer):

  class Meta:
    model = Blog
    fields = ['id','title','description','author', 'likes']

  
class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'