from django.urls import path
from . import views

urlpatterns = [
    # path("products/", views.getproducts, name="allproducts"),
    path("user/profile/", views.getLoggedInUserDetails, name="userprofile"),
    path("admin/users/", views.getAllUsers, name="allusers"),
    path("user/profile/update", views.updateUser, name="updateprofile"),
]