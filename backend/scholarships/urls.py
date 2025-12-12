from django.urls import path
from .views import ScholarshipListCreateView

urlpatterns = [
    path("", ScholarshipListCreateView.as_view(), name="scholarship-list-create"),
]