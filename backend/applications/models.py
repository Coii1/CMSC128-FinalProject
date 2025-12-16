from django.db import models

from users.models import StudentProfile
from scholarships.models import Scholarship


class Application(models.Model):
	STATUS_SUBMITTED = "submitted"
	STATUS_UNDER_REVIEW = "under_review"
	STATUS_APPROVED = "approved"
	STATUS_REJECTED = "rejected"

	STATUS_CHOICES = [
		(STATUS_SUBMITTED, "Submitted"),
		(STATUS_UNDER_REVIEW, "Under Review"),
		(STATUS_APPROVED, "Approved"),
		(STATUS_REJECTED, "Rejected"),
	]

	student = models.ForeignKey(
		StudentProfile,
		on_delete=models.CASCADE,
		related_name="applications",
	)
	scholarship = models.ForeignKey(
		Scholarship,
		on_delete=models.CASCADE,
		related_name="applications",
	)

	status = models.CharField(
		max_length=20,
		choices=STATUS_CHOICES,
		default=STATUS_SUBMITTED,
	)
	submission_date = models.DateTimeField(auto_now_add=True)
	review_date = models.DateTimeField(null=True, blank=True)
	remarks = models.TextField(null=True, blank=True)

	class Meta:
		unique_together = ("student", "scholarship")
		ordering = ["-submission_date"]

	def __str__(self) -> str:
		return f"Application #{self.pk} - {self.student.user.username} -> {self.scholarship.title}"

