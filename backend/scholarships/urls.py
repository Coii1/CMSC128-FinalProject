from django.urls import path
from . import views

urlpatterns = [
    path("", views.ScholarshipListCreateView.as_view(), name="scholarship-list-create"),
]