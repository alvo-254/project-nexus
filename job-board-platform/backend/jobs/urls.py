from django.urls import path
from . import views
   
urlpatterns = [
       path('categories/', views.CategoryListCreateView.as_view(), name='category-list'),
       path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail'),
       path('jobs/', views.JobListCreateView.as_view(), name='job-list'),
       path('jobs/<int:pk>/', views.JobDetailView.as_view(), name='job-detail'),
       path('applications/', views.JobApplicationListCreateView.as_view(), name='application-list'),
       path('applications/<int:pk>/', views.JobApplicationDetailView.as_view(), name='application-detail'),
       path('stats/', views.job_stats, name='job-stats'),
   ]