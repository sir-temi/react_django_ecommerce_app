from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True, upload_to="images")
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=1)
    numReviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    countInStock = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    rating = models.IntegerField(default=0, null=True, blank=True)
    comment = models.TextField(blank=True)
    
    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=100, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    qty = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    postalCode = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    def __str__(self):
        return self.address