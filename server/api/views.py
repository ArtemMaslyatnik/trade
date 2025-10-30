from rest_framework import viewsets
from api import models
from api import serializers
from django_filters.rest_framework import DjangoFilterBackend


# Catalogs
class CompanyViewSet(viewsets.ModelViewSet):

    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer


class PartnerViewSet(viewsets.ModelViewSet):

    queryset = models.Partner.objects.all()
    serializer_class = serializers.PartnerSerializer


class ContractViewSet(viewsets.ModelViewSet):

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'company', 'partner']

    queryset = models.Contract.objects.all()
    serializer_class = serializers.ContractSerializer


class GoodsViewSet(viewsets.ModelViewSet):

    queryset = models.Goods.objects.all()
    serializer_class = serializers.GoodsSerializer


class WarehouseViewSet(viewsets.ModelViewSet):

    queryset = models.Warehouse.objects.all()
    serializer_class = serializers.WarehouseSerializer


# Documents
class InvoiceOutViewSet(viewsets.ModelViewSet):

    queryset = models.InvoiceOut.objects.all()
    serializer_class = serializers.InvoiceOutSerializer


class InvoiceInViewSet(viewsets.ModelViewSet):

    queryset = models.InvoiceIn.objects.all()
    serializer_class = serializers.InvoiceInSerializer
