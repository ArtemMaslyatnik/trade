from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from api.enum import TypeMovement


# Abstract class
#
class Catalog(models.Model):
    name = models.CharField(max_length=100)
    is_delete = models.BooleanField(default=False, null=False, blank=False)
    is_group = models.BooleanField(default=False, null=False, blank=False)
    is_parent = models.BooleanField(default=False, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Document(models.Model):
    number = models.BigIntegerField()
    is_active = models.BooleanField(default=True, null=False, blank=False)
    is_delete = models.BooleanField(default=False, null=False, blank=False)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class List(models.Model):
    number = models.IntegerField()

    class Meta:
        abstract = True


class MovementTable(models.Model):
    is_active = models.BooleanField(default=True, null=False, blank=False)
    type_movement = models.CharField(max_length=3,
                                     choices=TypeMovement.choices)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    recorder = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'id')
    number = models.IntegerField()
    date = models.DateTimeField()

    class Meta:
        abstract = True


# Catalogs
class Company(Catalog):
    id = models.BigAutoField


class Partner(Catalog):
    id = models.BigAutoField


class Contract(Catalog):

    id = models.BigAutoField
    date = models.DateTimeField()
    company = models.ForeignKey(Company,  on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner, related_name='contracts', on_delete=models.CASCADE)


class Goods(Catalog):
    id = models.BigAutoField


class Warehouse(Catalog):
    id = models.BigAutoField


# Documents
class InvoiceOut(Document):
    id = models.BigAutoField
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)
    wrehouse = models.ForeignKey(Warehouse, null=True, on_delete=models.CASCADE)
    total = models.BigIntegerField()


class InvoiceOutList(List):
    id = models.BigAutoField
    invoice_out = models.ForeignKey(InvoiceOut, related_name='invoice_in_list', on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    price = models.BigIntegerField()
    quantity = models.BigIntegerField()
    sum = models.BigIntegerField()


class InvoiceIn(Document):
    id = models.BigAutoField
    company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner, null=True, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contract, null=True, on_delete=models.CASCADE)
    wrehouse = models.ForeignKey(Warehouse, null=True, on_delete=models.CASCADE)
    total = models.BigIntegerField()


class InvoiceInList(List):
    id = models.BigAutoField
    invoice_in = models.ForeignKey(InvoiceIn, related_name='invoice_in_list', on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, null=True, on_delete=models.CASCADE)
    price = models.BigIntegerField()
    quantity = models.BigIntegerField()
    sum = models.BigIntegerField()


class MovementGoods(MovementTable):
    id = models.PositiveIntegerField
    goods = models.ForeignKey(Goods, null=False, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, null=False, on_delete=models.CASCADE)
    quantity = models.BigIntegerField()
    batch = models.ForeignKey(InvoiceIn, null=False, on_delete=models.CASCADE)
    sum = models.BigIntegerField()
