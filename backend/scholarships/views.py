from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from .models import Scholarship
from .serializers import ScholarshipSerializer

class ScholarshipListCreateView(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all().order_by('-created_at')
    serializer_class = ScholarshipSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            # Only Admin users can POST (create scholarships)
            return [IsAdminUser()]
        # Allow anyone to GET the scholarships list (public homepage)
        return [AllowAny()]
