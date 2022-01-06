from rest_framework import routers
from .api import TuoteViewSet

router = routers.DefaultRouter()
router.register("api/tuotteet", TuoteViewSet, "tuote")

urlpatterns = router.urls
