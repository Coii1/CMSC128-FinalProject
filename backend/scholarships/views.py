from rest_framework import generics
from .models import Scholarship
from rest_framework.permissions import AllowAny
from .serializers import ScholarshipSerializer

class ScholarshipListCreateView(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all().order_by('-created_at')
    serializer_class = ScholarshipSerializer
<<<<<<< Updated upstream
    permission_classes = [AllowAny]   # ← Anyone can GET or POST
=======

    def get_permissions(self):
        if self.request.method == "POST":
            # Only Admin users can POST (create scholarships)
            # return [IsAdminUser()]
            return [AllowAny()] # Temporarily allow anyone to create scholarships for testing
        # Allow anyone to GET the scholarships list (public homepage)
        return [AllowAny()]
>>>>>>> Stashed changes
