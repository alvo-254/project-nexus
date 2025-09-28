from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from .models import Category, Job, JobApplication
from .serializers import CategorySerializer, JobSerializer, JobApplicationSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrAdmin
from .filters import JobFilter
   

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.annotate(jobs_count=Count('jobs'))
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
   

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
   

class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.select_related('category', 'posted_by').annotate(
        applications_count=Count('applications')
    ).filter(is_active=True)
    serializer_class = JobSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]  # ✅ fixed
    filterset_class = JobFilter
    search_fields = ['title', 'company', 'description', 'location']
    ordering_fields = ['created_at', 'title', 'salary_min']
    ordering = ['-created_at']
   

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.select_related('category', 'posted_by').annotate(
        applications_count=Count('applications')
    )
    serializer_class = JobSerializer
    permission_classes = [IsOwnerOrAdmin]
   

class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'admin':
            return JobApplication.objects.select_related('job', 'applicant').all()
        return JobApplication.objects.select_related('job', 'applicant').filter(
            applicant=self.request.user
        )
   

class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.role == 'admin':
            return JobApplication.objects.select_related('job', 'applicant').all()
        return JobApplication.objects.select_related('job', 'applicant').filter(
            applicant=self.request.user
        )
   

@api_view(['GET'])
@permission_classes([])
def job_stats(request):
    total_jobs = Job.objects.filter(is_active=True).count()
    total_categories = Category.objects.count()
    total_applications = JobApplication.objects.count()
    
    return Response({
        'total_jobs': total_jobs,
        'total_categories': total_categories,
        'total_applications': total_applications,
    })
