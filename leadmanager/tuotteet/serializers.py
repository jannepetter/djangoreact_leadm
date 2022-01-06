from rest_framework import serializers
from .models import Tuote, Arvostelu
from django.db import models


class TuoteSerializer(serializers.ModelSerializer):
    myyja_nimi = serializers.ReadOnlyField(source="myyja.username")
    myyja_id = serializers.ReadOnlyField(source="myyja.id")

    class Meta:
        model = Tuote
        # fields = "__all__"
        fields = [
            "id",
            "nimi",
            "kuvaus",
            "hinta",
            "myyja_nimi",
            "myyja_id",
            "created_at",
        ]


class ArvosteluSerializer(serializers.ModelSerializer):
    arvostelija_nimi = serializers.ReadOnlyField(source="arvostelija.username")
    arvostelija_id = serializers.ReadOnlyField(source="arvostelija.id")

    class Meta:
        model = Arvostelu
        fields = [
            "id",
            "arvostelija_nimi",
            "arvostelija_id",
            "tuote_id",
            "tahdet",
            "teksti",
        ]
