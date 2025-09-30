from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Job, Category, Location, Application
from .serializers import (
    JobSerializer, 
    CategorySerializer, 
    LocationSerializer, 
    ApplicationSerializer
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for locations
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class JobViewSet(viewsets.ModelViewSet):
    """
    API endpoint for jobs with filtering
    """
    queryset = Job.objects.filter(is_active=True)
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'location', 'experience_level', 'job_type']
    search_fields = ['title', 'company', 'description']
    ordering_fields = ['created_at', 'salary']
    ordering = ['-created_at']


class ApplicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for job applications
    """
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "message": "Application submitted successfully!",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )