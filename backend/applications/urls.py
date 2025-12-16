from django.urls import path

from .views import (
    StudentApplicationListCreateView,
    StudentApplicationDetailView,
    AdminApplicationListView,
    AdminApplicationDetailView,
)


urlpatterns = [
    # Student endpoints
    path("student/", StudentApplicationListCreateView.as_view(), name="student-application-list-create"),
    path(
        "student/<int:pk>/",
        StudentApplicationDetailView.as_view(),
        name="student-application-detail",
    ),

    # Admin endpoints
    path("admin/", AdminApplicationListView.as_view(), name="admin-application-list"),
    path(
        "admin/<int:pk>/",
        AdminApplicationDetailView.as_view(),
        name="admin-application-detail",
    ),
]
