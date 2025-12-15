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


class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class StudentRegisterAPI(generics.CreateAPIView):
    """Dev-only: register a student and create StudentProfile automatically."""
    permission_classes = [permissions.AllowAny]
    serializer_class = StudentRegisterSerializer


class AdminRegisterAPI(generics.CreateAPIView):
    """Dev-only: register an admin (is_staff=True) and create AdminProfile."""
    permission_classes = [permissions.AllowAny]
    serializer_class = AdminRegisterSerializer

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    
# Role-Restricted test endpoints =======
class StudentOnlyAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not StudentProfile.objects.filter(user=request.user).exists():
            return Response({"error": "You are not a student"}, status=403)

        return Response({"message": "Welcome Student!"})


class AdminOnlyAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not AdminProfile.objects.filter(user=request.user).exists():
            return Response({"error": "You are not an admin"}, status=403)

        return Response({"message": "Welcome Admin!"})
# Role-Restricted test endpoints =======