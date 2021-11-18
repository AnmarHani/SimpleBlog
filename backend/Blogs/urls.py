from django.urls import path
from . import views

urlpatterns = [  
                            #Blog
  path('Blog-Search/<str:title>/', views.BlogSearch, name="Blog-Get-Title"),
  path('Blog-List/<int:page_num>/', views.BlogList, name="Blog-Get-Page"),
  path('Blog-Detail/<int:id>/', views.BlogDetail, name="Blog-Detail"),
  path('Blog-Create/', views.BlogCreate, name="Blog-Create"),
  path('Blog-Update/<int:id>/', views.BlogUpdate, name="Blog-Update"),
  path('Blog-Delete/<int:id>/', views.BlogDelete, name="Blog-Delete"),
  #------------------------------------------------------------------#
                            #Comment
  path('BlogComment/<int:id>/', views.BlogComment, name="BlogComment"),
  #------------------------------------------------------------------#  #------------------------------------------------------------------#
                             #Like
  path('Like/<int:id>/', views.blog_likes, name="Like"),
]