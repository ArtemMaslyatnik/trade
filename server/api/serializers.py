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


class SimpleContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Contract
        fields = ['id', 'name']


class SimpleGoodsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Goods
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

    # def create(self, validated_data):
    #     return models.Contract.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.content = validated_data.get('content', instance.content)
    #     instance.created = validated_data.get('created', instance.created)
    #     instance.save()
    #     return instance


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
        fields = ['number', 'goods', 'price', 'quantity', 'sum']


class InvoiceOutSerializer(serializers.ModelSerializer):

    invoice_out_list = InvoiceOutListSerializer(many=True, read_only=True)
    company = SimpleCompanySerializer()
    partner = SimplePartnerSerializer()
    contract = SimpleContractSerializer()

    class Meta:
        model = models.InvoiceOut
        fields = ['id', 'is_active', 'date', 'number', 'created_at', 'company',
                  'partner', 'contract', 'total', 'invoice_out_list']


class InvoiceInListSerializer(serializers.ModelSerializer):
    goods = SimpleGoodsSerializer()

    class Meta:
        model = models.InvoiceInList
        fields = ['number', 'goods', 'price', 'quantity', 'sum']


class InvoiceInSerializer(serializers.ModelSerializer):

    invoice_in_list = InvoiceInListSerializer(many=True)
    company = SimpleCompanySerializer()
    partner = SimplePartnerSerializer()
    contract = SimpleContractSerializer()

    class Meta:
        model = models.InvoiceIn
        fields = ['id', 'is_active', 'date', 'number', 'created_at', 'company',
                  'partner', 'contract', 'total', 'invoice_in_list',]

    def validate_company(self, value):
        try:
            id = self.initial_data.get('company')['id']
            value = models.Company.objects.get(id=id)
        except models.Company.DoesNotExist:
            raise serializers.ValidationError("Company is not found")
        return value

    def validate_partner(self, value):
        try:
            id = self.initial_data.get('partner')['id']
            value = models.Partner.objects.get(id=id)
        except models.Partner.DoesNotExist:
            raise serializers.ValidationError("Partner is not found")
        return value

    def validate_contract(self, value):
        try:
            id = self.initial_data.get('contract')['id']
            value = models.Contract.objects.get(id=id)
        except models.Contract.DoesNotExist:
            raise serializers.ValidationError("Contract is not found")
        return value

    def validate_invoice_in_list(self, value):
        value = []
        rowList = {}
        for row in self.initial_data['invoice_in_list']:
            try:
                goods = models.Goods.objects.get(id=row.get('goods')['id'])
                rowList = row.copy()
                rowList.update({'goods': goods})
                value.append(rowList)
            except models.Goods.DoesNotExist:
                raise serializers.ValidationError("Goods is not found")
        return value

    # def create(self, validated_data):
    #     return 1

    def update(self, instance, validated_data):

        invoices_in_list_data = validated_data.pop("invoice_in_list")

        for key, value in validated_data.items():
            setattr(instance, key, value)

        for row in invoices_in_list_data:
            inv_li = models.InvoiceInList.objects.filter(
                            invoice_in=instance, number=row['number'])
            if inv_li.count() > 0:
                models.InvoiceInList.objects.filter(
                    invoice_in=instance, number=row['number']).update(**row)
            else:
                models.InvoiceInList.objects.create(invoice_in=instance, **row)

        instance.save()
        return instance
