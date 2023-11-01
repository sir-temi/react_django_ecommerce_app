from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .serializers import UserSerializer, UserSerializerToken

from django.contrib.auth.hashers import make_password
from rest_framework import status
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def getLoggedInUserDetails(request):
    # this request.user helps get logged in user model when jwtoken is used
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    # this request.user helps get logged in user model when jwtoken is used
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data

    user = User.objects.create(
        first_name = data['first_name'],
        last_name = data['last_name'],
        username = data['username'],
        email = data['email'],
        password = make_password(data['password'])
    )

    serializer = UserSerializerToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def checkObject(request, obj):
    if "@" in obj:
        try:
            got_email = User.objects.get(email=obj)
            return Response("Exists")
        except User.DoesNotExist:
            return Response("None")
    else:
        try:
            got_username = User.objects.get(username=obj)
            return Response("Exists")
        except User.DoesNotExist:
            return Response("None")


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    data = request.data

    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.email = data["email"]
    user.username = data["username"]

    user.save()

    serializer = UserSerializerToken(user, many=False)
    return Response(serializer.data)