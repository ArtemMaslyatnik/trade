import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE} from "./utils/consts";
import Goods from "./pages/Goods";
import Maine from "./pages/Main";
import Contract from "./pages/Contract";
import Company from "./pages/Company";
import Partner from "./pages/Partner";
import InvoceIn from "./pages/InvoceIn";
import InvoceOut from "./pages/InvoceOut";

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
        path: CONTRACT_ROUTE,
        Element: <Contract/>
    },
    {
        path: PARTNER_ROUTE,
        Element: <Partner/>
    },
    {
        path: COMPANY_ROUTE,
        Element: <Company/>
    },
    {
        path: INVOCE_IN_ROUTE,
        Element: <InvoceIn/>
    },
        {
        path: INVOCE_OUT_ROUTE,
        Element: <InvoceOut/>
    },
    // {
    //     path: PARTNER_ROUTE + '/:id',
    //     Element: <DevicePage/>
    // },
]
