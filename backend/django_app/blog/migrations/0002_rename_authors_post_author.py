# Generated by Django 4.1.3 on 2022-11-21 19:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='authors',
            new_name='author',
        ),
    ]
