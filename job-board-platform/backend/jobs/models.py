from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Job(models.Model):
    EXPERIENCE_CHOICES = [
        ('entry', 'Entry Level'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior Level'),
    ]
    
    JOB_TYPE_CHOICES = [
        ('full-time', 'Full-time'),
        ('part-time', 'Part-time'),
        ('contract', 'Contract'),
        ('freelance', 'Freelance'),
    ]
    
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField()
    requirements = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    benefits = models.TextField(blank=True)
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='jobs')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='jobs')
    
    experience_level = models.CharField(max_length=10, choices=EXPERIENCE_CHOICES, default='mid')
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES, default='full-time')
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} at {self.company}"


class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    cover_letter = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.full_name} - {self.job.title}"