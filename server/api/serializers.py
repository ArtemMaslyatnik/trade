from rest_framework import serializers
from api import models


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Company
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Partner
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contract
        fields = '__all__'


class GoodsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Goods
        fields = '__all__'


class InvoiceOutListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InvoiceOutList
        fields = ['number', 'goods', 'price', 'quantity']


class InvoiceOutSerializer(serializers.ModelSerializer):

    invoice_out_list = InvoiceOutListSerializer(many=True, read_only=True)

    class Meta:
        model = models.InvoiceOut
        fields = ['company', 'partner', 'contract', 'invoice_out_list']


class InvoiceInListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InvoiceInList
        fields = '__all__'


class InvoiceInSerializer(serializers.ModelSerializer):

    invoice_in_list = InvoiceInListSerializer(many=True, read_only=True)

    class Meta:
        model = models.InvoiceIn
        fields = ['company', 'partner', 'contract', 'invoice_in_list']
