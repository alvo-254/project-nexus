from rest_framework import serializers
from .models import Job, Category, Location, Application


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name']


class JobSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    location_name = serializers.CharField(source='location.name', read_only=True)
    
    class Meta:
        model = Job
        fields = [
            'id', 
            'title', 
            'company', 
            'description',
            'requirements',
            'responsibilities',
            'benefits',
            'category', 
            'category_name',
            'location', 
            'location_name',
            'experience_level',
            'job_type',
            'salary',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']


class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    
    class Meta:
        model = Application
        fields = [
            'id',
            'job',
            'job_title',
            'full_name',
            'email',
            'phone',
            'cover_letter',
            'created_at',
        ]
        read_only_fields = ['created_at']