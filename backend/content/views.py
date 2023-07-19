from rest_framework import viewsets
from .models import Post, Page, Author, Category, Tag
from .serializers import PostSerializer, PageSerializer, AuthorSerializer, CategorySerializer, TagSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'

class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'slug'


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class PostDetail(APIView):
    def get(self, request, slug, format=None):
        post = get_object_or_404(Post, slug=slug)
        serializer = PostSerializer(post)
        return Response(serializer.data)

class PageDetail(APIView):
    def get(self, request, slug, format=None):
        page = get_object_or_404(Page, slug=slug)
        serializer = PageSerializer(page)
        return Response(serializer.data)