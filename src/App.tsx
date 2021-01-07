import React from 'react';
import Routers, {routes} from './router';
import { RouteItem } from './interface';
import './App.scss';

function App() {
    const style = {
        marginTop: '10px'
    };
    return (
        <div className='App'>
            {
                routes.map((route: RouteItem, index: number) => {
                    return (
                        <a className='link' href={route.path} key={index}>{route.meta.title}</a>
                    );
                })
            }
            <div style={style}>
                <Routers/>
            </div>
        </div>
    );
}

export default App;
