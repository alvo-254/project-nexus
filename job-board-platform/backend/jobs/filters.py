import django_filters
from .models import Job

class JobFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='icontains')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    experience_level = django_filters.ChoiceFilter(choices=Job.EXPERIENCE_CHOICES)
    job_type = django_filters.ChoiceFilter(choices=Job.JOB_TYPE_CHOICES)
    salary_min = django_filters.NumberFilter(field_name='salary_min', lookup_expr='gte')
    salary_max = django_filters.NumberFilter(field_name='salary_max', lookup_expr='lte')
    
    class Meta:
        model = Job
        fields = ['category', 'location', 'experience_level', 'job_type', 'salary_min', 'salary_max']
