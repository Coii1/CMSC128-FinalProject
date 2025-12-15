from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import PermissionDenied

from .models import Document
from .serializers import (
	StudentDocumentUploadSerializer,
	AdminDocumentSerializer,
)
from applications.models import Application
from users.models import StudentProfile


class StudentDocumentListCreateView(generics.ListCreateAPIView):
	serializer_class = StudentDocumentUploadSerializer
	permission_classes = [IsAuthenticated]

	def _get_student_profile(self) -> StudentProfile:
		try:
			return StudentProfile.objects.get(user=self.request.user)
		except StudentProfile.DoesNotExist:
			raise PermissionDenied("You are not registered as a student.")

	def get_application(self) -> Application:
		application_id = self.kwargs["application_id"]
		student = self._get_student_profile()
		try:
			return Application.objects.get(id=application_id, student=student)
		except Application.DoesNotExist:
			raise PermissionDenied("You do not have access to this application.")

	def get_queryset(self):
		application = self.get_application()
		return Document.objects.filter(application=application)

	def perform_create(self, serializer):
		application = self.get_application()
		serializer.save(application=application)


class AdminDocumentListView(generics.ListAPIView):
	serializer_class = AdminDocumentSerializer
	permission_classes = [IsAdminUser]

	def get_queryset(self):
		qs = Document.objects.select_related("application__student__user", "application__scholarship")

		application_id = self.request.query_params.get("application_id")
		scholarship_id = self.request.query_params.get("scholarship_id")
		verified = self.request.query_params.get("verified")

		if application_id:
			qs = qs.filter(application_id=application_id)
		if scholarship_id:
			qs = qs.filter(application__scholarship_id=scholarship_id)
		if verified is not None:
			if verified.lower() in ["true", "1"]:
				qs = qs.filter(verified=True)
			elif verified.lower() in ["false", "0"]:
				qs = qs.filter(verified=False)

		return qs


class AdminDocumentVerifyView(generics.UpdateAPIView):
	serializer_class = AdminDocumentSerializer
	permission_classes = [IsAdminUser]
	queryset = Document.objects.select_related("application__student__user", "application__scholarship")

