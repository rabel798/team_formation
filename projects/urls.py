from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, RegistrationView

router = DefaultRouter()
router.register(r'teams', TeamViewSet, basename='team')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegistrationView.as_view(), name='register'),
]