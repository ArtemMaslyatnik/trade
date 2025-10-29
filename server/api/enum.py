from django.db import models


class TypeMovement(models.TextChoices):
    Outcome = "Out", "Outcome"
    Income = "In", "Income"
