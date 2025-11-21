from rest_framework import serializers
from .models import Scholarship

class ScholarshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scholarship
        fields = [
            'id',
            'title',
            'slots',
            'qualifications',
            'benefits',
            'instructions',
            'requirements',
            'start_date',
            'end_date',
            'deadline',
            'created_at',
            'updated_at',
        ]

    # Custom validation: start_date must be ≤ end_date and ≤ deadline
    def validate(self, data):
        start = data.get('start_date')
        end = data.get('end_date')
        deadline = data.get('deadline')

        if start and end and start > end:
            raise serializers.ValidationError("Start date must be before or equal to end date.")

        if start and deadline and start > deadline:
            raise serializers.ValidationError("Start date must be before or equal to deadline.")

        return data
