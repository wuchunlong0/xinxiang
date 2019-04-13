# -*- coding: utf-8 -*-
from django.contrib.auth import login as auth_login 
from django.contrib.auth import authenticate, login 
from django.shortcuts import render
from django.http.response import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from myAPI.checkcode import gcheckcode

#  http://localhost:9000/home/myregister/
def myregister(request):
    path = 'home/myregister.html'
    g_checkcode = gcheckcode(request)
    if request.method != 'POST':
        return  render(request, path, context=locals())       
    name = request.POST['username']
    isname = User.objects.filter(username = name)
    if isname:  
        messages.info(request, name + u' 用户已经注册！')
        return HttpResponseRedirect('#')   
    email = request.POST['email']
    password = request.POST['password']
    if not name or not email or not password:
        messages.info(request,'err: UserName NULL!')
        return  HttpResponseRedirect('#')
    user = User.objects.create_user(name, email, password) 
    user.is_staff = False 
    user.is_superuser = False 
    user.save()
    auth_login(request, user)
    return  HttpResponseRedirect('/')
  
# http://localhost:9000/home/mylogin/
def mylogin(request):
    if request.method != 'POST':
        return  render(request, 'home/mylogin.html', context=locals()) 
    username = request.POST['username']
    password = request.POST['password']
    href = request.POST['href']
    if href == '':  href = '/' 
    user = authenticate(username=username, password=password) 
    if user: 
        auth_login(request, user)#当函数名是login，必须用auth_login
        return  HttpResponseRedirect(href)
    messages.info(request, u'登录失败！请输入一个正确的 用户名 和密码. 注意他们都是区分大小写的！')
    return  render(request, 'home/mylogin.html', context=locals())



