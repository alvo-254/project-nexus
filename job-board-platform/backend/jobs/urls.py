from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, CategoryViewSet, LocationViewSet, ApplicationViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'locations', LocationViewSet, basename='location')
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
]