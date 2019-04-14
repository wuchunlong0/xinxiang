# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from myAPI import checkcode
from . import home

urlpatterns = [ 
    
    url(r'^checkcodeGIF/', checkcode.checkcodeGIF, name="checkcodeGIF"),
    url(r'^getcheckcode/', checkcode.getcheckcode, name="getcheckcode"),
    url(r'^myregister/', home.myregister, name="myregister"),    
    url(r'^mylogin/', home.mylogin, name="mylogin"),

]