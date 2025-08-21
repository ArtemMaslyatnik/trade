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


class InvoiceOutListSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceOut
        fields = ['number', 'goods' 'price', 'quantity']


class InvoiceOutSerializer(serializers.ModelSerializer):

    InvoiceOutList =  InvoiceOutListSerializer(many=True, read_only=True)

    class Meta:
        model = InvoiceOut
        fields = []


class InvoiceInSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvoiceIn
        fields = '__all__'