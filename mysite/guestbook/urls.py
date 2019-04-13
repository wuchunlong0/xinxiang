# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from . import guestbook

urlpatterns = [
    url(r'^gettitle/', guestbook.gettitle, name="gettitle"),
    url(r'^reply/', guestbook.reply, name="reply"),
    url(r'^create/', guestbook.create, name="create"),
    url(r'^show/(?P<page>\d*)?$', guestbook.show, name="show"),
    url(r'^showreply/(?P<page>\d*)?$', guestbook.showreply, name="showreply"),

    url(r'^test/', guestbook.test, name="test"),
]