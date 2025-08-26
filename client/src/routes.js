import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE} from "./utils/consts";
import Goods from "./pages/Goods";
import Maine from "./pages/Main";
import Contract from "./pages/Contract";
import Company from "./pages/Company";
import Partner from "./pages/Partner";
import InvoceIn from "./pages/InvoceIn";
import InvoceOut from "./pages/InvoceOut";
import GoodsItem from "./components/GoodsItem";
import CompanyItem from "./components/CompanyItem";
import ContractItem from "./components/ContractItem";
import PartnerItem from "./components/PartnerItem";
import InvoceInItem from "./components/InvoceInItem";
import InvoceOutItem from "./components/InvoceOutItem";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Element: <Maine/>
    },

    {
        path: GOODS_ROUTE,
        Element: <Goods/>
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
        path: PARTNER_ROUTE + '/:id',
        Element: <PartnerItem/>
    },
    {
        path: COMPANY_ROUTE,
        Element: <Company/>
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
