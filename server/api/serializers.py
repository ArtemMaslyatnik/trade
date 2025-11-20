from rest_framework import serializers
from api import models
from django.db import transaction, connection
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
    goods = SimpleGoodsSerializer()

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
        fields = ['id', 'is_active', 'is_delete', 'date', 'number',
                  'created_at', 'company', 'warehouse',
                  'partner', 'contract', 'total', 'invoice_out_list']

    @transaction.atomic
    def create(self, validated_data, ):
        # Конвертация клиенских данных в объекты базы
        convert_to_object(self, validated_data, models.InvoiceOut)

        invoices_out_list_data = validated_data.pop("invoice_out_list")
        InvoiceOut = models.InvoiceOut.objects.create(**validated_data)
        # Формируем структуру данных Для движения
        list_goods = []

        for row in invoices_out_list_data:
            new_obj = models.InvoiceOutList.objects.create(
                                    invoice_out=InvoiceOut, **row)
            list_goods.append(new_obj)

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = InvoiceOut
        data_dict['list_goods'] = list_goods
        movement_out(data_dict, TypeMovement.Outcome)
        return InvoiceOut

    @transaction.atomic
    def update(self, instance, validated_data):

        # Конвертация клиенских данных в объекты базы
        convert_to_object(self, validated_data)

        invoices_out_list_data = validated_data.pop("invoice_out_list")

        for key, value in validated_data.items():
            setattr(instance, key, value)
        # Формируем структуру данных Для движения
        list_goods = []

        models.InvoiceOutList.objects.filter(invoice_out=instance).delete()
        for row in invoices_out_list_data:
            new_obj = models.InvoiceOutList.objects.create(
                                    invoice_out=instance, **row)
            list_goods.append(new_obj)

        instance.save()

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = instance
        data_dict['list_goods'] = list_goods
        movement_out(data_dict, TypeMovement.Outcome)
        return instance


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
            new_obj = models.InvoiceInList.objects.create(invoice_in=InvoiceIn,
                                                          **row)
            list_goods.append(new_obj)

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = InvoiceIn
        data_dict['list_goods'] = list_goods
        movement_in(data_dict, TypeMovement.Income)
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
            new_obj = models.InvoiceInList.objects.create(invoice_in=instance,
                                                          **row)
            list_goods.append(new_obj)

        instance.save()

        # Движение по связанным таблицам
        data_dict = {}
        data_dict['head'] = instance
        data_dict['list_goods'] = list_goods
        movement_in(data_dict, TypeMovement.Income)
        return instance


# Рекурсивно меняем id на объекты
def convert_to_object(serializer, validated_data, class_instance=None,
                      list_name=None):
    # Метополя для итерации
    if class_instance is None:
        meta_filds = serializer.instance._meta.get_fields()
    else:
        meta_filds = class_instance._meta.get_fields()

    for field in meta_filds:
        if field.name in validated_data:
            if field.get_internal_type() == 'ForeignKey':
                # Получаем класс из мета данных
                field_name = field.name.replace('_', ' ').title().replace(' ',
                                                                          '')
                class_instance = getattr(models, field_name)
                # Список класов
                if isinstance(validated_data[field.name], list):
                    for element in validated_data[field.name]:
                        convert_to_object(serializer, element, class_instance,
                                          field.name)
                else:
                    if validated_data[field.name] is not None:
                        try:
                            # ID из initial_data, в validated_data нет
                            if list_name is None:
                                id = serializer.initial_data.get(
                                                            field.name)['id']
                            else:
                                # индекс списка = номер строки
                                num_line = validated_data.get('number')-1
                                # необходимая строка
                                line = serializer.initial_data.get(
                                                        list_name)[num_line]
                                # id объекта
                                id = line[field.name]['id']
                            validated_data[field.name] = class_instance.objects.get(id=id)
                        except class_instance.DoesNotExist:
                            validated_data[field.name] = None
    return validated_data


def movement_in(data_dict, type_movement):

    head = data_dict['head']
    
    if not head.is_active or head.is_delete:
        return
   
    recorder_ct = ContentType.objects.get_for_model(head)

    # Удаляем движение
    models.MovementGoods.objects.filter(content_type=recorder_ct,
                                        recorder=head.id).delete()

    for row in data_dict['list_goods']:

        new_obj = models.MovementGoods()
        new_obj.date = head.date
        new_obj.type_movement = type_movement
        new_obj.is_active = head.is_active
        new_obj.number = row.number
        new_obj.warehouse = head.warehouse
        new_obj.quantity = row.quantity
        new_obj.sum = row.sum
        new_obj.batch = head
        new_obj.goods = row.goods
        new_obj.content_type = recorder_ct
        new_obj.recorder = head.id
        new_obj.save()


def movement_out(data_dict, type_movement):

    head = data_dict['head']
    if not head.is_active or head.is_delete:
        return

    recorder_ct = ContentType.objects.get_for_model(head)
    data_dict['list_goods']

    # Удаляем движение
    models.MovementGoods.objects.filter(content_type=recorder_ct,
                                        recorder=head.id).delete()
    # получаем остатки
    with connection.cursor() as cursor:
        # '-- 1 Данные по документу'
        cursor.execute(" CREATE TEMPORARY TABLE tt_doc AS SELECT  inv_list.goods_id AS goods_in_doc, SUM(inv_list.sum) AS sum_in_doc, SUM(inv_list.quantity) AS quantity_in_doc FROM api_invoiceoutlist AS inv_list GROUP BY goods_id; ")
        # Остатки
        cursor.executescript('CREATE TEMPORARY TABLE tt_remains AS '
                             ' SELECT mg.date, ' 
                             '  SUM(CASE WHEN mg.type_movement == "In" THEN mg.quantity '
                        '        ELSE - mg.quantity END ) AS quantity, '
                        '  SUM(CASE WHEN mg.type_movement == "In" THEN mg.sum '
                        '        ELSE - mg.sum END ) AS sum, '
                       '    mg.warehouse_id, '
                       '    mg.goods_id, '
                       '    mg.batch_id '
                       'FROM '
                       '    tt_doc LEFT JOIN api_movementgoods AS mg ON '
                       '    tt_doc.goods_in_doc = mg.goods_id '
                       'WHERE '
                       '    is_active '
                       'GROUP BY '
                       '    goods_id, '
                       '    batch_id, '
                       '    warehouse_id '
                       'HAVING '
                       '    SUM(CASE '
                       '        WHEN type_movement == "In" THEN '
                       '            quantity '
                       '        ELSE '
                       '            - quantity '
                       '    END ) > 0 '
                       ';')
        # # Итог
        cursor.execute('SELECT '
                       '    tt_doc.goods_in_doc, '
                       '    tt_doc.sum_in_doc, '
                       '    tt_doc.quantity_in_doc, '
                       '    tt_remains.quantity, '
                       '    tt_remains.sum, '
                       '    tt_remains.batch_id, '
                       '    tt_remains.date, '
                       '    1 AS sort, '
                       '    0 AS total '
                       'FROM '
                       '    tt_doc LEFT JOIN tt_remains  ON '
                       '    tt_doc.goods_in_doc = tt_remains.goods_id '
                       'WHERE '
                       '    warehouse_id = 1 '
                       'UNION ALL '
                       'SELECT '
                       '    tt_doc.goods_in_doc, '
                       '    MAX(tt_doc.sum_in_doc), '
                       '    MAX(tt_doc.quantity_in_doc), '
                       '    SUM(tt_remains.quantity), '
                       '    NULL, '
                       '    NULL, '
                       '    NULL, '
                       '    0,  '
                       '    1  '
                       'FROM '
                       '    tt_doc LEFT JOIN tt_remains  ON '
                       '    tt_doc.goods_in_doc = tt_remains.goods_id '
                       'WHERE '
                       '    warehouse_id = 1 '
                       'ORDER BY '
                       '    date, '
                       '    sort; '
        )
        results = dictfetchall(cursor)

    # Добовляем движение
    line_number = 0
    for row in results:
        # Групировка по партии
        if row['total']:
            if row['quantity'] < row['quantity_in_doc']:
                # Сообщить если нехватает
                head.is_active = False
            continue

        # Ошибку вызвать
        if not head.is_active:
            return
        line_number += 1

        remains_quanttity_out = row['quantity_in_doc']
        quantity_out = min(remains_quanttity_out, row['quantity'])
        if row['quantity'] == quantity_out:
            out_amount = row['sum']
        else:
            out_amount = row['sum']/row['quantity'] * quantity_out

        new_obj = models.MovementGoods()
        new_obj.date = head.date
        new_obj.type_movement = type_movement
        new_obj.is_active = head.is_active
        new_obj.number = line_number
        new_obj.warehouse = head.warehouse
        new_obj.quantity = quantity_out
        new_obj.sum = out_amount
        new_obj.batch = models.InvoiceIn.objects.get(id=row['batch_id'])
        new_obj.goods = models.Goods.objects.get(id=row['goods_in_doc'])
        new_obj.content_type = recorder_ct
        new_obj.recorder = head.id
        new_obj.save()


# Service def
def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]