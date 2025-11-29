from rest_framework import generics
from .models import Scholarship
from rest_framework.permissions import AllowAny
from .serializers import ScholarshipSerializer

class ScholarshipListCreateView(generics.ListCreateAPIView):
    queryset = Scholarship.objects.all().order_by('-created_at')
    serializer_class = ScholarshipSerializer
    permission_classes = [AllowAny]   # ← Anyone can GET or POST
