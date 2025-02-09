from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    ROLE_CHOICES = [
        ('LEADER', 'Team Leader'),
        ('APPLICANT', 'Team Applicant'),
    ]
    
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='APPLICANT'
    )

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Team(models.Model):
    name = models.CharField(max_length=100)
    project_idea = models.TextField()
    required_skills = models.JSONField()
    max_members = models.IntegerField(default=4)
    leader = models.ForeignKey('projects.User', on_delete=models.CASCADE, related_name='led_teams')
    members = models.ManyToManyField('projects.User', related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def is_full(self):
        return self.members.count() >= self.max_members

class Application(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    ]
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey('projects.User', on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['team', 'user']

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete = models.CASCADE)
    skills = models.TextField()
    resume = models.FileField(upload_to = 'resumes/', null = True, blank = True)

    def __str__(self):
        return self.user.username
    
class TeamMembership(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    joined_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.team.name} ({self.status})"