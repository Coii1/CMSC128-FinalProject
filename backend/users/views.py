from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    StudentRegisterSerializer,
    AdminRegisterSerializer,
)

# Role-Restricted test endpoints =======
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import StudentProfile, AdminProfile
# Role-Restricted test endpoints =======

User = get_user_model()


# POST /auth/register/
# - POST: register a generic user (base registration endpoint)
class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# POST /auth/register/student/
# - POST: register a student and create StudentProfile automatically
class StudentRegisterAPI(generics.CreateAPIView):
    """Dev-only: register a student and create StudentProfile automatically."""
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentRegisterSerializer


# POST /auth/register/admin/
# - POST: register an admin (is_staff=True) and create AdminProfile
class AdminRegisterAPI(generics.CreateAPIView):
    """Dev-only: register an admin (is_staff=True) and create AdminProfile."""
    permission_classes = [permissions.AllowAny]
    serializer_class = AdminRegisterSerializer


# GET /auth/user/
# - GET: return the currently authenticated user's data
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
# Role-Restricted test endpoints =======

# GET /auth/test/student/
# - GET: test endpoint, returns 200 only if the logged-in user has a StudentProfile
class StudentOnlyAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not StudentProfile.objects.filter(user=request.user).exists():
            return Response({"error": "You are not a student"}, status=403)

        return Response({"message": "Welcome Student!"})


# GET /auth/test/admin/
# - GET: test endpoint, returns 200 only if the logged-in user has an AdminProfile
class AdminOnlyAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not AdminProfile.objects.filter(user=request.user).exists():
            return Response({"error": "You are not an admin"}, status=403)

        return Response({"message": "Welcome Admin!"})
# Role-Restricted test endpoints =======