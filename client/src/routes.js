import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE, GOODS_ADD_ROUTE, COMPANY_ADD_ROUTE, PARTNER_ADD_ROUTE} from "./utils/consts";
import Maine from "./pages/Main";
import Contract from "./pages/ContractList";
import ContractItem from "./components/ContractItem";

import PartnerList from "./pages/PartnerList";
import PartnerItem from "./components/PartnerItem";

import InvoceIn from "./pages/InvoceIn";
import InvoceOut from "./pages/InvoceOut";

import InvoceInItem from "./components/InvoceInItem";
import InvoceOutItem from "./components/InvoceOutItem";

import GoodsList from "./pages/GoodsList";
import CreateGoods from "./components/Goods/CreateGoods";
import GoodsItem from "./components/Goods/GoodsItem";

import CompanyList from "./pages/CompanyList";
import CompanyItem from "./components/Company/CompanyItem";
import CreateCompany from "./components/Company/CreateCompany";

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
        Element: <CreateGoods/>
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
        Element: <Partner/>
    },
    {
        path: PARTNER_ADD_ROUTE,
        Element: <Partner/>
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
        Element: <CreateCompany/>
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
