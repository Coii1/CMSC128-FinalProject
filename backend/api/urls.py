from django.urls import path
from . import views

urlpatterns = [
    path("scholarships/", views.ScholarshipListCreate.as_view(), name="scholarship-list"),
    path("scholarships/<int:pk>/", views.ScholarshipDetail.as_view(), name="scholarship-detail"),
    path("applications/", views.ScholarshipApplicationListCreate.as_view(), name="application-list"),
    path("applications/<int:pk>/", views.ScholarshipApplicationDetail.as_view(), name="application-detail"),
]
