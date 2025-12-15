from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterAPI,
    StudentRegisterAPI,
    AdminRegisterAPI,
    UserAPI,
    StudentOnlyAPI,
    AdminOnlyAPI,
)

urlpatterns = [
    # Dev registration endpoints. NOTE: remove or protect in production.
    path("register/", RegisterAPI.as_view(), name="register"),
    path("register/student/", StudentRegisterAPI.as_view(), name="register-student"),
    path("register/admin/", AdminRegisterAPI.as_view(), name="register-admin"),

    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("me/", UserAPI.as_view(), name="user-detail"),

    # Test role routes
    path("test/student/", StudentOnlyAPI.as_view()),
    path("test/admin/", AdminOnlyAPI.as_view()),
]
