import React, { useContext } from "react";
import {Routes, Route, Navigate } from 'react-router-dom'
import {publicRoutes} from '../routes';
import {MAIN_ROUTE} from '../utils/consts';
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {

    return (
        <Routes>
            {publicRoutes.map(({path, Element}) =>
                <Route key={path} path={path} element={Element} exact/>
            )}
            <Route path="/" element={<Navigate to={MAIN_ROUTE} replace />} />
        </Routes>
    );
});

export default AppRouter;