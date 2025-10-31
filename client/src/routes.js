import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE, GOODS_ADD_ROUTE, COMPANY_ADD_ROUTE, PARTNER_ADD_ROUTE, CONTRACT_ADD_ROUTE, INVOCE_IN_ADD_ROUTE, WAREHOUSE_ROUTE, WAREHOUSE_ADD_ROUTE} from "./utils/consts";
import Maine from "./pages/Main";
import Contract from "./pages/Contract/ContractList";
import ContractItem from "./pages/Contract/ContractItem";
import ContractCreate from "./pages/Contract/ContractCreate";

import PartnerList from "./pages/Partner/PartnerList";
import PartnerItem from "./pages/Partner/PartnerItem";
import PartnerCreate from "./pages/Partner/PartnerCreate";

import InvoceInList from "./pages/InvoceIn/InvoceInList";
import InvoceInItem from "./pages/InvoceIn/InvoceInItem";

import InvoceOutList from "./pages/InvoceOut/InvoceOutList";
import InvoceOutItem from "./pages/InvoceOut/InvoceOutItem";

import GoodsList from "./pages/Goods/GoodsList";
import GoodsItem from "./pages/Goods/GoodsItem";

import WarehouseList from "./pages/Warehouse/WarehouseList";
import WarehouseItem from "./pages/Warehouse/WarehouseItem";

import CompanyList from "./pages/Company/CompanyList";
import CompanyItem from "./pages/Company/CompanyItem";
import CompanyCreate from "./pages/Company/CompanyCreate";



export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Element: <Maine/>
    },

    {
        path: GOODS_ROUTE,
        Element: <GoodsList/>
    },
    {
        path: GOODS_ADD_ROUTE,
        Element: <GoodsItem/>
    },
    {
        path: GOODS_ROUTE + '/:id',
        Element: <GoodsItem/>
    },
   
    {
        path: CONTRACT_ROUTE,
        Element: <Contract/>
    },
    {
        path: CONTRACT_ADD_ROUTE,
        Element: <ContractCreate/>
    },
    {
        path: CONTRACT_ROUTE + '/:id',
        Element: <ContractItem/>
    },
    {
        path: PARTNER_ROUTE,
        Element: <PartnerList/>
    },
    {
        path: PARTNER_ADD_ROUTE,
        Element: <PartnerCreate/>
    },
    {
        path: PARTNER_ROUTE + '/:id',
        Element: <PartnerItem/>
    },
    {
        path: COMPANY_ROUTE,
        Element: <CompanyList/>
    },
    {
        path: COMPANY_ADD_ROUTE,
        Element: <CompanyCreate/>
    },
    {
        path: COMPANY_ROUTE+ '/:id',
        Element: <CompanyItem/>
    },
    {
        path: WAREHOUSE_ROUTE,
        Element: <WarehouseList/>
    },
    {
        path: WAREHOUSE_ADD_ROUTE,
        Element: <WarehouseItem/>
    },
    {
        path: WAREHOUSE_ROUTE + '/:id',
        Element: <WarehouseItem/>
    },
    {
        path: INVOCE_IN_ROUTE,
        Element: <InvoceInList/>
    },
    {
        path: INVOCE_IN_ADD_ROUTE,
        Element: <InvoceInItem/>
    },
    {
        path: INVOCE_IN_ROUTE+ '/:id',
        Element: <InvoceInItem/>
    },
    {
        path: INVOCE_OUT_ROUTE,
        Element: <InvoceOutList/>
    },
    {
        path: INVOCE_OUT_ROUTE+ '/:id',
        Element: <InvoceOutItem/>
    },
]
