from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# model of users, students, and admins
# schema in database; similar to models.py in scholarships
# extend users built-in model in django or abstract user

class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    student_number = models.CharField(max_length=50, unique=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20)
    course = models.CharField(max_length=100)
    income_bracket = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.user.username} (Student)"


class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} (Admin)"