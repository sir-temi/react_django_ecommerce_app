from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.getproducts, name="allproducts"),
    path("products/<int:pk>/", views.singleproduct, name="singleproduct")
]