from django.contrib import admin
from .models import User, Team, Application

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role']
    list_filter = ['role']

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'leader', 'member_count', 'max_members']
    list_filter = ['created_at']

    def member_count(self, obj):
        return obj.members.count()
    member_count.short_description = 'Current Members'

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['user', 'team', 'status', 'created_at']
    list_filter = ['status']