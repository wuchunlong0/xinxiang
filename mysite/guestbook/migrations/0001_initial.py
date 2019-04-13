# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-08-02 12:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Guestbook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=512, null=True)),
                ('title', models.CharField(blank=True, max_length=64, null=True)),
                ('tel', models.CharField(blank=True, max_length=12, null=True)),
                ('content', models.TextField(blank=True, max_length=256, null=True)),
                ('state', models.IntegerField(default=0)),
                ('date', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=512, null=True)),
                ('guestbookname', models.CharField(blank=True, max_length=512, null=True)),
                ('title', models.CharField(blank=True, max_length=512, null=True)),
                ('content', models.TextField(blank=True, max_length=256, null=True)),
                ('date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
