from django.urls import include, path
from api import views
from rest_framework.routers import DefaultRouter

app_name = 'api'

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'company', views.CompanyViewSet,
                basename='company')
router.register(r'partner', views.PartnerViewSet,
                basename='partner')
router.register(r'contract', views.ContractViewSet,
                basename='contract')
router.register(r'goods',  views.GoodsViewSet,
                basename='goods')
router.register(r'invoice_out', views.InvoiceOutViewSet,
                basename='invoice_out')
router.register(r'invoice_in', views.InvoiceInViewSet,
                basename='invoice_in')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
