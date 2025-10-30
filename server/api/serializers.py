from rest_framework import serializers
from api import models
from django.db import transaction
from django.contrib.contenttypes.models import ContentType

from api.enum import TypeMovement


# Catalogs simple
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


class SimpleWarehouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Warehouse
        fields = ['id', 'name']


# Catalogs
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
                  'is_delete', 'date', 'company', 'partner']
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
                  'is_delete', 'contracts']
        depth = 0


class GoodsSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Goods
        fields = '__all__'


class WarehouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Warehouse
        fields = '__all__'


# Documents
class InvoiceOutListSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.InvoiceOutList
        fields = ['number', 'goods', 'price', 'quantity', 'sum']


class InvoiceOutSerializer(serializers.ModelSerializer):

    invoice_out_list = InvoiceOutListSerializer(many=True)
    company = SimpleCompanySerializer(allow_null=True)
    partner = SimplePartnerSerializer(allow_null=True)
    contract = SimpleContractSerializer(allow_null=True)
    warehouse = SimpleWarehouseSerializer(allow_null=True)

    class Meta:
        model = models.InvoiceOut
        fields = ['id', 'is_active', 'date', 'number', 'created_at', 'company',
                  'warehouse', 'partner', 'contract', 'total',
                  'invoice_out_list']


class InvoiceInListSerializer(serializers.ModelSerializer):
    goods = SimpleGoodsSerializer()

    class Meta:
        model = models.InvoiceInList
        fields = ['number', 'goods', 'price', 'quantity', 'sum']


class InvoiceInSerializer(serializers.ModelSerializer):

    invoice_in_list = InvoiceInListSerializer(many=True)
    company = SimpleCompanySerializer(allow_null=True)
    partner = SimplePartnerSerializer(allow_null=True)
    contract = SimpleContractSerializer(allow_null=True)
    warehouse = SimpleWarehouseSerializer(allow_null=True)

    class Meta:
        model = models.InvoiceIn
        fields = ['id', 'is_active', 'is_delete', 'date', 'number',
                  'created_at', 'company', 'warehouse',
                  'partner', 'contract', 'total', 'invoice_in_list',]

    @transaction.atomic
    def create(self, validated_data, ):
        # Конвертация клиенских данных в объекты базы
        convert_to_object(self, validated_data, models.InvoiceIn)

        invoices_in_list_data = validated_data.pop("invoice_in_list")
        InvoiceIn = models.InvoiceIn.objects.create(**validated_data)
        # Формируем структуру данных Для движения
        list_goods = []

        for row in invoices_in_list_data:
            new_obj = models.InvoiceInList.objects.create(invoice_in=InvoiceIn, **row)
            list_goods.append(new_obj)

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = InvoiceIn
        data_dict['list_goods'] = list_goods
        movement(data_dict)
        return InvoiceIn

    @transaction.atomic
    def update(self, instance, validated_data):

        # Конвертация клиенских данных в объекты базы
        convert_to_object(self, validated_data)

        invoices_in_list_data = validated_data.pop("invoice_in_list")

        for key, value in validated_data.items():
            setattr(instance, key, value)
        # Формируем структуру данных Для движения
        list_goods = []

        models.InvoiceInList.objects.filter(invoice_in=instance).delete()
        for row in invoices_in_list_data:
            new_obj = models.InvoiceInList.objects.create(invoice_in=instance, **row)
            list_goods.append(new_obj)

        instance.save()

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = instance
        data_dict['list_goods'] = list_goods
        movement(data_dict)
        return instance


# Рекурсивно меняем id на объекты
def convert_to_object(serializer, validated_data, class_instance=None, list_name=None):
    # Метополя для итерации
    if class_instance is None:
        meta_filds = serializer.instance._meta.get_fields()
    else:
        meta_filds = class_instance._meta.get_fields()

    for field in meta_filds:
        if field.name in validated_data:
            if field.get_internal_type() == 'ForeignKey':
                # Получаем класс из мета данных
                field_name = field.name.replace('_', ' ').title().replace(' ', '')
                class_instance = getattr(models, field_name)
                # Список класов 
                if isinstance(validated_data[field.name], list):
                    for element in validated_data[field.name]:
                        convert_to_object(serializer, element, class_instance, field.name)
                else:
                    if validated_data[field.name] is not None:
                        try:
                            # ID из initial_data, в validated_data нет
                            if list_name is None:
                                id = serializer.initial_data.get(field.name)['id']
                            else:
                                # индекс списка = номер строки
                                num_line = validated_data.get('number')-1
                                # необходимая строка
                                line = serializer.initial_data.get(list_name)[num_line]
                                # id объекта
                                id = line[field.name]['id']
                            validated_data[field.name] = class_instance.objects.get(id=id)
                        except class_instance.DoesNotExist:
                            validated_data[field.name] = None
    return validated_data


def movement(data_dict):

    head = data_dict['head']
    recorder_ct = ContentType.objects.get_for_model(head)

    # Удаляем движение
    models.MovementGoods.objects.filter(content_type=recorder_ct,
                                        recorder=head.id).delete()
    if not head.is_active or head.is_delete:
        return

    for row in data_dict['list_goods']:

        new_obj = models.MovementGoods()
        new_obj.date = head.date
        new_obj.type_movement = TypeMovement.Income
        new_obj.is_active = head.is_active
        new_obj.number = row.number
        new_obj.quantity = row.quantity
        new_obj.sum = row.sum
        new_obj.batch = head
        new_obj.goods = row.goods
        new_obj.content_type = recorder_ct
        new_obj.recorder = head.id
        new_obj.save()
