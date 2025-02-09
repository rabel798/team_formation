from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Team, TeamMembership
from .serializers import TeamSerializer, TeamMembershipSerializer, UserRegistrationSerializer

# Create your views here.

class RegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

class RoleBasedAccessMixin:
    def check_role_permission(self, required_role):
        if not self.request.user.is_authenticated:
            return False
        return self.request.user.role == required_role

class TeamViewSet(RoleBasedAccessMixin, viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Team.objects.all()
        if self.request.user.role == 'LEADER':
            # Team leaders can see all teams
            return queryset
        else:
            # Applicants can only see teams that aren't full
            return queryset.filter(is_full=False)
    
    def create(self, request, *args, **kwargs):
        if not self.check_role_permission('LEADER'):
            return Response(
                {'error': 'Only team leaders can create teams'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().create(request, *args, **kwargs)
    
    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        if not self.check_role_permission('APPLICANT'):
            return Response(
                {'error': 'Only applicants can apply to teams'},
                status=status.HTTP_403_FORBIDDEN
            )
        team = self.get_object()
        if team.is_full:
            return Response(
                {'error': 'Team is full'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user already applied
        existing_application = TeamMembership.objects.filter(
            user=request.user,
            team=team
        ).exists()
        
        if existing_application:
            return Response(
                {'error': 'Already applied to this team'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        TeamMembership.objects.create(
            user=request.user,
            team=team,
            status='PENDING'
        )
        return Response({'status': 'Application submitted'})
    
    @action(detail=True, methods=['post'])
    def handle_application(self, request, pk=None):
        if not self.check_role_permission('LEADER'):
            return Response(
                {'error': 'Only team leaders can handle applications'},
                status=status.HTTP_403_FORBIDDEN
            )
        team = self.get_object()
        membership = get_object_or_404(
            TeamMembership,
            id=request.data.get('membership_id')
        )
        action = request.data.get('action')
        
        if action == 'accept':
            membership.status = 'ACCEPTED'
            # Check if team is now full
            accepted_count = team.teammembership_set.filter(
                status='ACCEPTED'
            ).count()
            if accepted_count + 1 >= team.max_members:
                team.is_full = True
                team.save()
        elif action == 'reject':
            membership.status = 'REJECTED'
        
        membership.save()
        return Response({'status': f'Application {action}ed'})
