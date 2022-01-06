from rest_framework import viewsets, permissions
from rest_framework.decorators import permission_classes, action
from .serializers import TuoteSerializer, ArvosteluSerializer
from .models import Tuote, Arvostelu
from rest_framework.response import Response


class TuoteViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = TuoteSerializer
    http_method_names = ["get", "post", "put", "delete"]

    def get_queryset(self):
        return Tuote.objects.all()

    def create(self, request):
        jeh = {
            "nimi": request.data["nimi"],
            "kuvaus": request.data["kuvaus"],
            "hinta": request.data["hinta"],
            "myyja": request.user,
        }
        uusituote = Tuote.objects.create(**jeh)
        return Response(
            {
                "tuote": TuoteSerializer(
                    uusituote, context=self.get_serializer_context()
                ).data
            }
        )

    def update(self, request, pk=None):
        tuote = Tuote.objects.get(id=pk)
        if tuote.myyja.id != request.user.id:
            return Response(status=401)

        tuoteserializer = TuoteSerializer(instance=tuote, data=request.data)
        if tuoteserializer.is_valid(raise_exception=True):
            tuoteserializer.save()
        return Response(
            {
                "tuote": TuoteSerializer(
                    tuote, context=self.get_serializer_context()
                ).data
            }
        )

    def destroy(self, request, pk=None):
        print("deletoimassa", pk)
        tuote = Tuote.objects.get(id=pk)
        tuote.delete()
        return Response({"vastaus": "tuhottu"}, status=204)

    @action(detail=True, methods=["post"])
    def arvostele(self, request, pk=None):
        tuote = Tuote.objects.get(id=pk)
        arvostelu_data = {
            "arvostelija": request.user,
            "tuote_id": tuote,
            "tahdet": request.data["tahdet"],
            "teksti": request.data["teksti"],
        }
        uusiArvostelu = Arvostelu.objects.create(**arvostelu_data)
        print("arvostellaan", pk, request.data, request.user)
        return Response(
            {
                "arvostelu": ArvosteluSerializer(
                    uusiArvostelu, context=self.get_serializer_context()
                ).data
            },
            status=201,
        )

    @action(detail=True, methods=["get"], url_path="arvostelut")
    def hae_arvostelut(self, request, pk=None):
        print("jeh", request.data, pk)
        arvostelut = Arvostelu.objects.filter(tuote_id=pk)
        return Response(
            {
                "arvostelut": ArvosteluSerializer(
                    arvostelut, context=self.get_serializer_context(), many=True
                ).data
            },
            status=200,
        )
