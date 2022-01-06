from django.contrib import admin
from .models import Lead

# Register your models here.
class LeadAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "message", "owner", "created_at"]


admin.site.register(Lead, LeadAdmin)
