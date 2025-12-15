from rest_framework import serializers

from .models import Document


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            "id",
            "application",
            "requirement_name",
            "file",
            "file_type",
            "upload_date",
            "verified",
        )
        read_only_fields = ("id", "application", "upload_date")


class StudentDocumentUploadSerializer(DocumentSerializer):
    class Meta(DocumentSerializer.Meta):
        read_only_fields = ("id", "application", "upload_date", "verified")


class AdminDocumentSerializer(DocumentSerializer):
    class Meta(DocumentSerializer.Meta):
        read_only_fields = (
            "id",
            "application",
            "requirement_name",
            "file",
            "file_type",
            "upload_date",
        )
