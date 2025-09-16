from django.db import models


# Abstract class
#
class Catalog(models.Model):
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True, null=False, blank=False)
    is_group = models.BooleanField(default=False, null=False, blank=False)
    is_parent = models.BooleanField(default=False, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Document(models.Model):
    number = models.BigIntegerField()
    is_active = models.BooleanField(default=True, null=False, blank=False)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class List(models.Model):
    number = models.IntegerField()

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


# Documents
class InvoiceOut(Document):
    id = models.BigAutoField
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)


class InvoiceOutList(List):
    id = models.BigAutoField
    invoice_out = models.ForeignKey(InvoiceOut, related_name='invoice_in_list', on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    price = models.BigIntegerField()
    quantity = models.BigIntegerField()


class InvoiceIn(Document):
    id = models.BigAutoField
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner,  on_delete=models.CASCADE)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE)


class InvoiceInList(List):
    id = models.BigAutoField
    invoice_in = models.ForeignKey(InvoiceIn, related_name='invoice_in_list', on_delete=models.CASCADE)
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE)
    price = models.BigIntegerField()
    quantity = models.BigIntegerField()
