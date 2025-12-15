from django.db import models

class Scholarship(models.Model):
    SCHOLARSHIP_TYPE_CHOICES = [
        ('government', 'Government-Funded'),
        ('private', 'Private'),
    ]
    
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    slots = models.PositiveIntegerField()
    qualifications = models.TextField()
    benefits = models.TextField()
    instructions = models.TextField()
    type = models.CharField(max_length=20, choices=SCHOLARSHIP_TYPE_CHOICES)
    requirements = models.TextField()
    start_date = models.DateField()    
    # start_date must be ≤ deadline in serializer
    end_date = models.DateField()
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title