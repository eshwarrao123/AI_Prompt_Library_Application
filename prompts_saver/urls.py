from django.urls import path
from . import views

urlpatterns = [
    path('prompts/', views.prompt_list),
    path('prompts/<int:id>/', views.prompt_detail),
]