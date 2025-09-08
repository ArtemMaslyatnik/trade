from rest_framework import serializers
from api import models


class SimpleCompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Company
        fields = ['id', 'name']


class SimplePartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Partner
        fields = ['id', 'name']


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Company
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):

    company = SimpleCompanySerializer()
    partner = SimplePartnerSerializer()

    class Meta:
        model = models.Contract
        fields = ['id', 'name', 'is_group', 'is_parent',
                  'is_active', 'date', 'company', 'partner']
        depth = 0


class PartnerSerializer(serializers.ModelSerializer):

    contracts = ContractSerializer(many=True, read_only=True)

    class Meta:
        model = models.Partner
        fields = ['id', 'name', 'is_group', 'is_parent',
                  'is_active', 'contracts']
        depth = 0


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
        fields = ['id', 'is_active', 'number', 'created_at', 'company',
                  'partner', 'contract', 'invoice_out_list']


class InvoiceInListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InvoiceInList
        fields = ['number', 'goods', 'price', 'quantity']


class InvoiceInSerializer(serializers.ModelSerializer):

    invoice_in_list = InvoiceInListSerializer(many=True, read_only=True)

    class Meta:
        model = models.InvoiceIn
        fields = ['id', 'is_active', 'number', 'created_at', 'company', 'partner',
                  'contract', 'invoice_in_list']
