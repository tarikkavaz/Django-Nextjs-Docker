from rest_framework import serializers
from .models import Post, Page, Author, Category, Tag

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        lookup_field = 'slug' 
        fields = '__all__'

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        lookup_field = 'slug'
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
