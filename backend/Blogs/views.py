from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect
from django.urls import reverse
#---------------------------------------------------#
            #Decorators Rest Framework#
from rest_framework.decorators import (api_view,permission_classes)
#---------------------------------------------------#
            #Response Rest Framework#
from rest_framework.response import Response
#---------------------------------------------------#
            #Permissions Rest Framework#
from rest_framework.permissions import (IsAuthenticated,AllowAny)
#---------------------------------------------------#
                      #Blogs#
from Blogs.models import *
from Blogs.serializers import *
#---------------------------------------------------#
                      #User#
from Account.models import * 
from Account.serializers import *
#---------------------------------------------------#
                    #Pagination#
from django.core.paginator import Paginator, EmptyPage
#---------------------------------------------------#
                      #Blogs#

#CRUD | Create(POST), Read(GET), Update(PUT), Delete(Delete)

                    #GET With Title
@api_view(['GET'])
#Guest Can See
@permission_classes([AllowAny])
def BlogSearch(request, title):
  GetBlog = Blog.objects.all().filter(title__contains=title)
  serializer = BlogSerializer(GetBlog, many=True)
  # for blog in GetBlog:
  #     blogs_id = GetBlog.get(id=blog.id).id
  #     blogs_title = GetBlog.get(id=blog.id).title
  #     blogs_description = GetBlog.get(id=blog.id).description
  #     blogs_authorname = GetBlog.get(id=blog.id).author.username
  #     blogs_likes = GetBlog.get(id=blog.id).count_like()
  #     data['id'] = blogs_id
  #     data['title'] = blogs_title
  #     data['description'] = blogs_description
  #     data['author_name'] = blogs_authorname
  #     data['likes'] = blogs_likes
  return Response(serializer.data)
#---------------------------------------------------#
                    #GET With Page
@api_view(['GET'])
#Guest Can See
@permission_classes([AllowAny])
def BlogList(request, page_num):
  GetBlog = Blog.objects.all().order_by('-id')

  p = Paginator(GetBlog, 10)
  try:
    page = p.page(page_num)
  except EmptyPage:
    page = p.page(1)
  
  serializer = BlogSerializer(page, many=True)
  # data['response'] = 'Success!'
  # blog_user = MyUser.objects.get(id=GetBlog.author)
  # data['title'] = serializer.data['title']
  # data['description'] = serializer.data['description']
  # data['likes'] = GetBlog.count_like()
  return Response({
    'data':serializer.data,
    'page_num': p.num_pages    
  })
#---------------------------------------------------#
                    #GET One
@api_view(['GET'])
#Guest Can See
@permission_classes([AllowAny])

def BlogDetail(request, id):
  try:
    GetBlog = get_object_or_404(Blog,pk=id)
    serializer = BlogSerializer(GetBlog, many=False)
    data = {

    }
    data['response'] = 'Success!'
    data['author'] = GetBlog.author.username
    data['title'] = serializer.data['title']
    data['description'] = serializer.data['description']
    data['likes'] = GetBlog.count_like()
  except ObjectDoesNotExist:
      return Response({"DoesNotExist":"Your Blog does not exist "})
  return Response(data)
  
  # return Response(serializer.data)
#---------------------------------------------------#
                    #POST
@api_view(['POST'])
#Only User Can
@permission_classes([AllowAny])

def BlogCreate(request):
  print(request.user)
  serializer = BlogSerializer(data={
    'author': request.user.id,
    'title' : request.data['title'],
    'description' : request.data['description'],
  }) #request.data = request.POST | Sends JSON Object
  if serializer.is_valid():
      serializer.save()
  else:
    return Response('Error: Data is not valid')

  return Response({
    'data': serializer.data,
    'author': request.user
  })
#---------------------------------------------------#
                    #PUT
@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
#Only User Can

def BlogUpdate(request, id):
  try:
    GetBlog = Blog.objects.get(id=id)
    serializer = BlogSerializer(instance=GetBlog, data={
      'title' : request.data['title'],
      'description' : request.data['description'],
      'author': request.user.id,
    }) #request.data = request.POST | Sends JSON Object but for API 
    #instance will update the data without creating new in table

    #Only The Owner of the Blog
    if GetBlog.author.id != request.user.id:
      return Response('Error: Your Not The Owner Of The Blog')

    if serializer.is_valid():
      serializer.save()
    else:
      return Response('Error: Data is not valid')
 
  except ObjectDoesNotExist:
      return Response('Error: Blog Does not Exist')
  

  return Response(serializer.data)
#---------------------------------------------------#
                    #DELETE
@api_view(['DELETE'])
#Only User Can
@permission_classes([IsAuthenticated])

def BlogDelete(request, id):
  try:
    GetBlog = Blog.objects.get(id=id)

    #Only The Owner of the Blog
    #The Owner of the Product
    if GetBlog.author.id != request.user.id:
      return Response('Error: Your Not The Owner Of The Blog')

    GetBlog.delete()

  except ObjectDoesNotExist:
      return Response('Error: Blog Does Not Exist ')

  return Response(True)
#---------------------------------------------------#
                      #Likes
@api_view(['POST'])
#Only User Can
@permission_classes([IsAuthenticated])

def blog_likes(request,id):
  try :
    blog = get_object_or_404(Blog,pk=id)
    liked_user = blog.likes.all() #Bring All Likes  For This Blog
    
    if request.user in liked_user: #Check If The User Is On The Liked Table , If Yes Unlike
      blog.likes.remove(request.user)
    else:
      blog.likes.add(request.user) #OtherWise Like The Blog.
    
  except ObjectDoesNotExist:
      return Response('Error: Blog Does Not Exist')

  return HttpResponseRedirect(reverse('Blog-Detail',args=[str(id)])) #Returns To The Blog
#---------------------------------------------------#
                      #Comments
@api_view(['POST'])
#Only User Can
@permission_classes([IsAuthenticated])

def BlogComment(request, id):
  try:
    serializer = CommentSerializer(data={
      'description' : request.data['description'],
      'commentor':request.user.id,
      'blog':id
    })
    
    if serializer.is_valid():
      serializer.save()
    else:
      return Response('Error: Data is not valid')
  
  except ObjectDoesNotExist:
      return Response('Error: Blog Does Not Exist')
  return Response(serializer.data)