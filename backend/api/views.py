from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ScholarshipSerializer, ScholarshipApplicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Scholarship, ScholarshipApplication


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ScholarshipListCreate(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Scholarship.objects.all()
        scholarship_type = self.request.query_params.get('type', None)
        if scholarship_type:
            queryset = queryset.filter(type=scholarship_type)
        return queryset


class ScholarshipDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    permission_classes = [AllowAny]


class ScholarshipApplicationListCreate(generics.ListCreateAPIView):
    serializer_class = ScholarshipApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ScholarshipApplication.objects.filter(student=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(student=self.request.user)
        else:
            print(serializer.errors)


class ScholarshipApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ScholarshipApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ScholarshipApplication.objects.filter(student=user)

