from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Team, TeamMembership

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'role', 'skills']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class TeamSerializer(serializers.ModelSerializer):
    leader = UserSerializer(read_only=True)
    current_members = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'leader', 'project_idea', 'required_skills', 
                 'max_members', 'is_full', 'created_at', 'current_members']
    
    def get_current_members(self, obj):
        accepted_members = obj.teammembership_set.filter(status='ACCEPTED')
        return UserSerializer([membership.user for membership in accepted_members], many=True).data

class TeamMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    
    class Meta:
        model = TeamMembership
        fields = ['id', 'user', 'team', 'status', 'joined_at'] 