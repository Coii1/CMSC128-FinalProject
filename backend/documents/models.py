from django.db import models

from applications.models import Application


class Document(models.Model):
	application = models.ForeignKey(
		Application,
		on_delete=models.CASCADE,
		related_name="documents",
	)
	# Logical label for which requirement this file satisfies
	requirement_name = models.CharField(max_length=255)

	file = models.FileField(upload_to="applications/%Y/%m/%d/")
	file_type = models.CharField(max_length=50)
	upload_date = models.DateTimeField(auto_now_add=True)
	verified = models.BooleanField(default=False)

	class Meta:
		unique_together = ("application", "requirement_name")
		ordering = ["-upload_date"]

	def __str__(self) -> str:
		return f"Document #{self.pk} for Application {self.application_id} - {self.requirement_name}"

