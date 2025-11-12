from django.db import models
from django.contrib.auth.models import User


class Scholarship(models.Model):
    SCHOLARSHIP_TYPE_CHOICES = [
        ('government', 'Government-Funded'),
        ('private', 'Private'),
    ]
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=SCHOLARSHIP_TYPE_CHOICES)
    slots = models.IntegerField()
    qualifications = models.TextField()
    documents = models.TextField()
    benefits = models.TextField()
    instructions = models.TextField()
    deadline = models.DateField()
    datePosted = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ScholarshipApplication(models.Model):
    APPLICATION_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    id = models.AutoField(primary_key=True)
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE, related_name="applications")
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=APPLICATION_STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.student.username} - {self.scholarship.name}"
