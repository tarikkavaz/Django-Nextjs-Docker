from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from content import views
from content.views import PageDetail
from content.views import PostDetail


router = DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'pages', views.PageViewSet)
router.register(r'authors', views.AuthorViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
