# Generated by Django 3.2.7 on 2021-10-11 08:59
# Generated by Django 3.2.5 on 2021-10-15 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_merge_20211008_1650'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='full_name',
            field=models.CharField(max_length=50, null=True),
        ),
    ]