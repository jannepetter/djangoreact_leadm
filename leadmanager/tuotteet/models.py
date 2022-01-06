from django.db import models
from django.contrib.auth.models import User
from django.forms.models import model_to_dict
from django.core.validators import MaxValueValidator, MinValueValidator


class Tuote(models.Model):
    nimi = models.CharField(max_length=100)
    kuvaus = models.TextField(blank=True)
    hinta = models.DecimalField(null=True, blank=True, decimal_places=2, max_digits=6)
    myyja = models.ForeignKey(User, related_name="seller", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(model_to_dict(self))


class Arvostelu(models.Model):
    arvostelija = models.ForeignKey(
        User, related_name="arvostelija", on_delete=models.CASCADE
    )
    tuote_id = models.ForeignKey(Tuote, null=True, on_delete=models.CASCADE)
    tahdet = models.IntegerField(
        default=1, validators=[MaxValueValidator(5), MinValueValidator(0)]
    )
    teksti = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return str(model_to_dict(self))
