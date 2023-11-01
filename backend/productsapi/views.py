from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .serializers import ProductSerializaer


@api_view(['GET'])
def getproducts(request):
    products = Product.objects.all()
    serializer = ProductSerializaer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def singleproduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializaer(product, many=False)
    return Response(serializer.data)
    