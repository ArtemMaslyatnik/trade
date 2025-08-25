import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE} from "./utils/consts";
import Goods from "./pages/Goods";
import Maine from "./pages/Main";
import Contract from "./pages/Contract";
import Company from "./pages/Company";
import Partner from "./pages/Partner";

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
    // {
    //     path: PARTNER_ROUTE + '/:id',
    //     Element: <DevicePage/>
    // },
]
