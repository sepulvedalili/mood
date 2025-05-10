from django.urls import path
from .views import RegisterUser, LoginUser, CreateMoodView


urlpatterns = [
    path('mood/', CreateMoodView.as_view(), name='create_mood'),
    path('users/', RegisterUser.as_view(), name='register-user'),
    path('login/', LoginUser.as_view(), name='login'),
]
