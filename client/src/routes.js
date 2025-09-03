import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE, GOODS_ADD_ROUTE, COMPANY_ADD_ROUTE, PARTNER_ADD_ROUTE} from "./utils/consts";
import Maine from "./pages/Main";
import Contract from "./pages/Contract/ContractList";
import ContractItem from "./pages/Contract/ContractItem";

import PartnerList from "./pages/Partner/PartnerList";
import PartnerItem from "./pages/Partner/PartnerItem";
import PartnerCreate from "./pages/Partner/PartnerCreate";

import InvoceIn from "./pages/InvoceIn";
import InvoceOut from "./pages/InvoceOut";

import InvoceInItem from "./components/InvoceInItem";
import InvoceOutItem from "./components/InvoceOutItem";

import GoodsList from "./pages/Goods/GoodsList";
import GoodsCreate from "./pages/Goods/GoodsCreate";
import GoodsItem from "./pages/Goods/GoodsItem";

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
        Element: <GoodsCreate/>
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
        path: INVOCE_IN_ROUTE,
        Element: <InvoceIn/>
    },
    {
        path: INVOCE_IN_ROUTE+ '/:id',
        Element: <InvoceInItem/>
    },
    {
        path: INVOCE_OUT_ROUTE,
        Element: <InvoceOut/>
    },
    {
        path: INVOCE_OUT_ROUTE+ '/:id',
        Element: <InvoceOutItem/>
    },
]
