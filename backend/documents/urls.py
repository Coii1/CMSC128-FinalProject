from django.urls import path

from .views import (
    StudentDocumentListCreateView,
    AdminDocumentListView,
    AdminDocumentVerifyView,
)


urlpatterns = [
    # Student endpoints: documents for a specific application
    path(
        "student/applications/<int:application_id>/documents/",
        StudentDocumentListCreateView.as_view(),
        name="student-document-list-create",
    ),

    # Admin endpoints
    path("admin/documents/", AdminDocumentListView.as_view(), name="admin-document-list"),
    path(
        "admin/documents/<int:pk>/",
        AdminDocumentVerifyView.as_view(),
        name="admin-document-verify",
    ),
]
