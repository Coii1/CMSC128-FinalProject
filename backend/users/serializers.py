from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction, IntegrityError

from .models import StudentProfile, AdminProfile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Basic generic register: creates a plain User (no profile)
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )


class StudentRegisterSerializer(serializers.ModelSerializer):
    # include both user fields and student-specific fields
    password = serializers.CharField(write_only=True)
    student_number = serializers.CharField()
    age = serializers.IntegerField()
    gender = serializers.CharField()
    course = serializers.CharField()
    income_bracket = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password',
                  'student_number', 'age', 'gender', 'course', 'income_bracket')

    def create(self, validated_data):
        # pop student fields
        student_number = validated_data.pop('student_number')
        age = validated_data.pop('age')
        gender = validated_data.pop('gender')
        course = validated_data.pop('course')
        income_bracket = validated_data.pop('income_bracket')

        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=validated_data['username'],
                    email=validated_data.get('email', ''),
                    password=validated_data['password'],
                    first_name=validated_data.get('first_name', ''),
                    last_name=validated_data.get('last_name', ''),
                    is_active=True,
                    is_staff=False,
                )

                StudentProfile.objects.create(
                    user=user,
                    student_number=student_number,
                    age=age,
                    gender=gender,
                    course=course,
                    income_bracket=income_bracket,
                )

        except IntegrityError:
            raise serializers.ValidationError({"detail": "User or student with these details already exists."})

        return user


class AdminRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')

    def create(self, validated_data):
        try:
            with transaction.atomic():
                user = User.objects.create_user(
                    username=validated_data['username'],
                    email=validated_data.get('email', ''),
                    password=validated_data['password'],
                    first_name=validated_data.get('first_name', ''),
                    last_name=validated_data.get('last_name', ''),
                    is_active=True,
                    is_staff=True,  # admin flag
                )

                # create admin profile row
                AdminProfile.objects.create(user=user)

        except IntegrityError:
            raise serializers.ValidationError({"detail": "Admin with these details already exists."})

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
