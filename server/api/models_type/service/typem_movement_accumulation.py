from django.db import models


class TypeMovementAccumulation(models.Model):
    id = models.BigIntegerField
    movement = models.CharField(max_length=3)
