import {FC, Component} from "react";

export interface Meta {
    title: string;
}

interface route {
    path: string;
    component: Component | FC;
    routes?: route[];
    meta: Meta;
}

export type RouteItem = route;
