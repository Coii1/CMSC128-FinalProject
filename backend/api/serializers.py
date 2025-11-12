from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Scholarship, ScholarshipApplication


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ["id", "name", "type", "slots", "qualifications", "documents", 
                 "benefits", "instructions", "deadline", "datePosted", "created_at"]
        extra_kwargs = {"created_at": {"read_only": True}, "datePosted": {"read_only": True}}


class ScholarshipApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScholarshipApplication
        fields = ["id", "scholarship", "student", "status", "applied_at"]
        extra_kwargs = {
            "student": {"read_only": True},
            "applied_at": {"read_only": True}
        }

