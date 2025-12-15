from django.utils import timezone

from rest_framework import serializers

from .models import Application
from users.models import StudentProfile
from scholarships.models import Scholarship
from documents.serializers import DocumentSerializer


class ApplicationSerializerBase(serializers.ModelSerializer):
    documents = DocumentSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = (
            "id",
            "student",
            "scholarship",
            "status",
            "submission_date",
            "review_date",
            "remarks",
            "documents",
        )


class StudentApplicationSerializer(ApplicationSerializerBase):
    class Meta(ApplicationSerializerBase.Meta):
        read_only_fields = (
            "id",
            "student",
            "status",
            "submission_date",
            "review_date",
            "remarks",
            "documents",
        )

    def validate(self, attrs):
        request = self.context.get("request")
        if request is None or not request.user.is_authenticated:
            raise serializers.ValidationError({"detail": "Authentication required."})

        try:
            student = StudentProfile.objects.get(user=request.user)
        except StudentProfile.DoesNotExist:
            raise serializers.ValidationError({"detail": "You are not registered as a student."})

        scholarship = attrs.get("scholarship")
        if scholarship and Application.objects.filter(student=student, scholarship=scholarship).exists():
            raise serializers.ValidationError({
                "non_field_errors": ["You have already applied for this scholarship."],
            })

        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        student = StudentProfile.objects.get(user=request.user)
        scholarship = validated_data["scholarship"]

        application = Application.objects.create(
            student=student,
            scholarship=scholarship,
            status=Application.STATUS_SUBMITTED,
        )
        return application


class AdminApplicationSerializer(ApplicationSerializerBase):
    class Meta(ApplicationSerializerBase.Meta):
        read_only_fields = (
            "id",
            "student",
            "scholarship",
            "submission_date",
        )

    def update(self, instance, validated_data):
        new_status = validated_data.get("status", instance.status)
        new_remarks = validated_data.get("remarks", instance.remarks)

        if (
            instance.status == Application.STATUS_SUBMITTED
            and new_status != instance.status
            and instance.review_date is None
        ):
            instance.review_date = timezone.now()

        instance.status = new_status
        instance.remarks = new_remarks
        instance.save()
        return instance
