"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView

from django.views.generic import TemplateView, ListView, View
class IndexView(TemplateView):
    template_name = 'home_1/home.html'

urlpatterns = [
         
    url(r'^login/$', auth_views.LoginView.as_view(), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    url(r'^admin/', admin.site.urls),

    url(r'^home/', include('home.urls')),
    url(r'^guestbook/', include('guestbook.urls')),
    
    url(r'^$', IndexView.as_view()),
    url(r'^index/$', IndexView.as_view(template_name='home_1/index.html')),
    url(r'^contact/$', IndexView.as_view(template_name='home_1/contact.html')),
    url(r'^about/$', IndexView.as_view(template_name='home_1/about.html')),
    url(r'^website/$', IndexView.as_view(template_name='home_1/website.html')),  
    url(r'^Trusteeship/$', IndexView.as_view(template_name='home_1/Trusteeship.html')),
    url(r'^wx/$', IndexView.as_view(template_name='wx/index.html')),
    
    
        
]
