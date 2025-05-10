from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Mood
from .serializers import MoodSerializer

from .models import CustomUser
from .serializers import CustomUserSerializer

class RegisterUser(APIView):
    """API view for registering a new user."""
    permission_classes = [AllowAny]

    def post(self,request):
        """
        Handle POST request to register a new user.
        
        Validates the request data and creates a new user if valid.
        Returns a success message and user data on success,
        or error messages on failure.
        """
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            user_data = CustomUserSerializer(user).data

            return Response({
                "message": "User successfully created",
                "user": user_data,
                "access_token": access_token
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(APIView):
    """API view for authenticating and logging in a user."""
    authentication_classes = []
    permission_classes = [AllowAny]  
    def post(self, request):
        """
        Handle POST request for user login.

        Authenticates user with given username and password.
        Returns a success message if credentials are valid,
        or an error message if authentication fails.
        """
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                "message": "Successful login",
                "access_token": access_token
            })
        return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
class CreateMoodView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
