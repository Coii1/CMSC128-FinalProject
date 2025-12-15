from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import PermissionDenied

from .models import Application
from .serializers import StudentApplicationSerializer, AdminApplicationSerializer
from users.models import StudentProfile

# GET /applications/student/
# - GET: returns all applications of the logged-in student
# - POST: creates a new application for the logged-in student for a given scholarship
class StudentApplicationListCreateView(generics.ListCreateAPIView):
	serializer_class = StudentApplicationSerializer
	permission_classes = [IsAuthenticated]

	def _get_student_profile(self) -> StudentProfile:
		try:
			return StudentProfile.objects.get(user=self.request.user)
		except StudentProfile.DoesNotExist:
			raise PermissionDenied("You are not registered as a student.")

	def get_queryset(self):
		student = self._get_student_profile()
		return (
			Application.objects.filter(student=student)
			.select_related("student__user", "scholarship")
			.prefetch_related("documents")
		)

	def perform_create(self, serializer):
		student = self._get_student_profile()
		serializer.save(student=student)

# GET /applications/student/<pk>/
# - GET: retrieves a specific application that belongs to the logged-in student (pk = application id)
class StudentApplicationDetailView(generics.RetrieveAPIView):
	serializer_class = StudentApplicationSerializer
	permission_classes = [IsAuthenticated]

	def _get_student_profile(self) -> StudentProfile:
		try:
			return StudentProfile.objects.get(user=self.request.user)
		except StudentProfile.DoesNotExist:
			raise PermissionDenied("You are not registered as a student.")

	def get_queryset(self):
		student = self._get_student_profile()
		return (
			Application.objects.filter(student=student)
			.select_related("student__user", "scholarship")
			.prefetch_related("documents")
		)


# GET /applications/admin/
# - GET: list all applications (admin only), with optional filters by scholarship_id and status
class AdminApplicationListView(generics.ListAPIView):
	serializer_class = AdminApplicationSerializer
	permission_classes = [IsAdminUser]

	def get_queryset(self):
		qs = Application.objects.select_related("student__user", "scholarship").prefetch_related(
			"documents"
		)

		scholarship_id = self.request.query_params.get("scholarship_id")
		status = self.request.query_params.get("status")

		if scholarship_id:
			qs = qs.filter(scholarship_id=scholarship_id)
		if status:
			qs = qs.filter(status=status)

		return qs


# GET /applications/admin/<pk>/
# - GET: retrieve a specific application (admin only)
# - PATCH: update status and remarks of an application (admin only)
class AdminApplicationDetailView(generics.RetrieveUpdateAPIView):
	serializer_class = AdminApplicationSerializer
	permission_classes = [IsAdminUser]
	queryset = Application.objects.select_related("student__user", "scholarship").prefetch_related(
		"documents"
	)

