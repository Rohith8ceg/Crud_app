from rest_framework import routers
from users.viewsets import UserViewset

router = routers.DefaultRouter()
router.register('user', UserViewset)
