from rest_framework import serializers
from .models import Category, Job, JobApplication
   
class CategorySerializer(serializers.ModelSerializer):
       jobs_count = serializers.IntegerField(read_only=True)
       
       class Meta:
           model = Category
           fields = ['id', 'name', 'description', 'jobs_count', 'created_at']
   
class JobSerializer(serializers.ModelSerializer):
       posted_by_name = serializers.CharField(source='posted_by.get_full_name', read_only=True)
       category_name = serializers.CharField(source='category.name', read_only=True)
       applications_count = serializers.IntegerField(read_only=True)
       
       class Meta:
           model = Job
           fields = [
               'id', 'title', 'description', 'company', 'location',
               'salary_min', 'salary_max', 'experience_level', 'job_type',
               'category', 'category_name', 'requirements', 'benefits',
               'is_active', 'posted_by', 'posted_by_name', 'created_at',
               'updated_at', 'application_deadline', 'applications_count'
           ]
           read_only_fields = ('posted_by', 'created_at', 'updated_at')
       
       def create(self, validated_data):
           validated_data['posted_by'] = self.context['request'].user
           return super().create(validated_data)
   
class JobApplicationSerializer(serializers.ModelSerializer):
       job_title = serializers.CharField(source='job.title', read_only=True)
       applicant_name = serializers.CharField(source='applicant.get_full_name', read_only=True)
       
       class Meta:
           model = JobApplication
           fields = [
               'id', 'job', 'job_title', 'applicant', 'applicant_name',
               'cover_letter', 'resume', 'status', 'applied_at', 'updated_at'
           ]
           read_only_fields = ('applicant', 'applied_at', 'updated_at')
       
       def create(self, validated_data):
           validated_data['applicant'] = self.context['request'].user
           return super().create(validated_data)