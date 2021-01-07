import React from "react";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { RouterItem, MetaItem } from '../class';
import { RouteItem } from '../interface';
import Base from "../views/base";

export const routes: RouteItem[] = [
    new RouterItem('/', Base, new MetaItem('数据结构与算法基础')),
];

export default function Routers() {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                {
                    routes.length > 0 && routes.map((route: any, index: number) => {
                        return <Route
                            key={index}
                            exact={index === 0}
                            path={route.path}
                            render={(props: any) => {
                                document.title = route.meta.title;
                                return <route.component {...props} routes={route.routes}/>;
                            }}
                        />
                    })
                }
            </Switch>
        </Router>
    );
}
