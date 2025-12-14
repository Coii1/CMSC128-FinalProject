from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import transaction, IntegrityError

from .models import StudentProfile, AdminProfile

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    # allow username to be omitted (we'll default it to email in create())
    username = serializers.CharField(required=False, allow_blank=True)
    # allow password to be omitted/empty so callers can rely on defaults if desired
    password = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Basic generic register: creates a plain User (no profile)
        # If username wasn't supplied, default it to the email
        username = validated_data.get('username') or validated_data.get('email')
        return User.objects.create_user(
            username=username,
            email=validated_data.get('email', ''),
            password=validated_data.get('password')
        )

#carefull not to create user vefore validation. 
class StudentRegisterSerializer(serializers.ModelSerializer):
    # include both user fields and student-specific fields
    # allow username/password to be omitted so we can default them
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    # student-specific fields are write-only so they won't be read from the User instance
    student_number = serializers.CharField(write_only=True)
    age = serializers.IntegerField(write_only=True)
    gender = serializers.CharField(write_only=True)
    course = serializers.CharField(write_only=True)
    income_bracket = serializers.IntegerField(write_only=True, min_value=0)

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
                # Ensure username defaults to email if not provided
                username = validated_data.get('username') or validated_data.get('email')
                # If a password wasn't provided (or is empty), default it to the student_number
                password = validated_data.get('password') or student_number
                user = User.objects.create_user(
                    username=username,
                    email=validated_data.get('email', ''),
                    password=password,
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
                username = validated_data.get('username') or validated_data.get('email')
                user = User.objects.create_user(
                    username=username,
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
