# jobboard_project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.shortcuts import redirect

def home(request):
    # Redirect root "/" to Swagger UI
    return redirect("swagger-ui")

urlpatterns = [
    # Root/Homepage → Redirect to Swagger
    path("", home, name="home"),

    # Admin Panel
    path("admin/", admin.site.urls),

    # Authentication (accounts app)
    path("api/auth/", include("accounts.urls")),

    # Jobs API (jobs app)
    path("api/jobs/", include("jobs.urls")),

    # API Schema & Docs
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
