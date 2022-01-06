from django.contrib import admin
from .models import Tuote, Arvostelu


class TuoteAdmin(admin.ModelAdmin):
    list_display = ["nimi", "kuvaus", "hinta", "myyja", "created_at"]


class ArvosteluAdmin(admin.ModelAdmin):
    list_diplay = "__all__"


# Register your models here.

admin.site.register(Tuote, TuoteAdmin)
admin.site.register(Arvostelu, ArvosteluAdmin)
