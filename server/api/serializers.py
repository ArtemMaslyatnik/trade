from rest_framework import serializers
from api.models import Company, Contract, Goods, InvoiceIn, InvoiceOut, Partner


class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = '__all__'


class PartnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Partner
        fields = '__all__'


class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        fields = '__all__'


class GoodsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Goods
        fields = '__all__'


class InvoiceOutSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceOut
        fields = '__all__'


class InvoiceInSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceIn
        fields = '__all__'