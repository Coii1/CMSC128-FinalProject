from django.urls import path
from .views import ScholarshipListCreateView, ScholarshipDetailAPI

urlpatterns = [
    path("", ScholarshipListCreateView.as_view(), name="scholarship-list-create"),
    path("<int:pk>/", ScholarshipDetailAPI.as_view(), name="scholarship-detail"),
]