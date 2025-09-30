from django.contrib import admin
from .models import Job, Category, Location, Application


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'category', 'location', 'experience_level', 'salary', 'is_active', 'created_at']
    list_filter = ['category', 'location', 'experience_level', 'job_type', 'is_active']
    search_fields = ['title', 'company', 'description']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'company', 'description')
        }),
        ('Job Details', {
            'fields': ('category', 'location', 'experience_level', 'job_type', 'salary')
        }),
        ('Additional Information', {
            'fields': ('requirements', 'responsibilities', 'benefits')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'job', 'created_at']
    list_filter = ['created_at', 'job']
    search_fields = ['full_name', 'email', 'job__title']
    date_hierarchy = 'created_at'
    ordering = ['-created_at']
    
    readonly_fields = ['created_at']