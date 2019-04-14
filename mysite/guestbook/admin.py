# -*- coding: utf-8 -*-
from django.contrib import admin
from . models import Guestbook,Reply

@admin.register(Guestbook)
class GuestbookAdmin(admin.ModelAdmin):    
    list_display = ('id','username','title','tel','content','state','date')
@admin.register(Reply)
class ReplyAdmin(admin.ModelAdmin):    
    list_display = ('id','username','guestbookname','title','content','date')
