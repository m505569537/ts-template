import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import NoMatch from './containers/NoMatch';

export interface child {
    path?: string,
    com: any
}

const Router = () => {
    const routes: Array<child> = [
        {
            path: '/',
            com: Home
        },
        {
            com: NoMatch
        }
    ];
    return (
        <HashRouter>
            <Switch>
                {
                    routes.map(({ path, com }) => <Route key={path || 'no-match'} exact path={path} component={com} />)
                }
            </Switch>
        </HashRouter>
    );
};

export default Router;