import { Component, FC } from "react";
import {
    RouteItem,
    Meta,
} from "../interface";

export class RouterItem implements RouteItem {
    component: Component | FC;
    meta: Meta;
    path: string;
    routes?: RouterItem[];
    constructor(path: string, component: any | FC, meta: Meta, routes?: RouterItem[]) {
        this.path = path;
        this.component = component;
        this.meta = meta;
        if (routes) {
            this.routes = routes;
        }
    }
}

export class MetaItem implements Meta {
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}
