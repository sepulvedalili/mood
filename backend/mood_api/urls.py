from django.urls import path
from .views import RegisterUser, LoginUser, CreateMoodView, MoodListView


urlpatterns = [
    path('moods/', MoodListView.as_view(), name='mood-list'),
    path('mood/', CreateMoodView.as_view(), name='create_mood'),
    path('users/', RegisterUser.as_view(), name='register-user'),
    path('login/', LoginUser.as_view(), name='login'),
]
