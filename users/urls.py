from django.urls import path
from . import views
from .views import RegisterView

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('user-list/', views.UserList, name="user-list"),
	path('user-detail/<str:pk>/', views.UserDetail, name="user-detail"),
	path('user-create/', RegisterView.as_view(), name="user-create"),

	#path('user-update/<str:pk>/', views.UserUpdate, name="user-update"),
	#path('user-delete/<str:pk>/', views.UserDelete, name="user-delete"),
	path('login/', views.Login, name="Login"),
    path('logout/', views.Logout, name="Logout"),
    path('whoami/', views.whoami_view, name='userapi-whoami'),
    path('session/', views.session_view, name='userapi-session'),
]



