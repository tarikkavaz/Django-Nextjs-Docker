from django.contrib import admin
from .models import Post, Page, Author, Category, Tag

admin.site.register(Post)
admin.site.register(Page)
admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Tag)
