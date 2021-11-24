from django.db import models
from Account.models import MyUser

class Blog(models.Model):
  title = models.CharField(max_length=200)
  description = models.TextField(max_length=500)
  likes = models.ManyToManyField(MyUser,related_name='Blog_likes', blank=True)
  author = models.ForeignKey(MyUser, on_delete=models.CASCADE)
  def count_like(self):
    return self.likes.count() 
  def __str__(self):
    return self.title
    
class Comment(models.Model):
  commentor = models.ForeignKey(MyUser, related_name='user',on_delete=models.CASCADE)
  description = models.TextField(max_length=500)
  blog = models.ForeignKey(Blog, related_name='blog_comment',on_delete=models.CASCADE, default=None)
  