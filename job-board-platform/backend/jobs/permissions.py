from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit, but anyone to view.
    """
    def has_permission(self, request, view):
        # Allow GET, HEAD, OPTIONS requests (read-only)
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only for authenticated admins
        return request.user.is_authenticated and request.user.role == 'admin'

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners or admins to edit objects.
    """
    def has_object_permission(self, request, view, obj):
        # Allow GET requests for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Admins have full access
        if request.user.is_authenticated and request.user.role == 'admin':
            return True
        
        # Check if user is the owner
        return obj.posted_by == request.user