import React, { useEffect, useState } from 'react';

import { withRouter, Switch } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';

import Layout from '../Layout';

const routes = [
    {
        path: '/',
        component: React.lazy(() => import('../FileUploader')),
        title: 'Upload Files',
    },
];

const Router = ({ location }: { location: any }) => {
    const { pathname } = location;

    const matched = matchRoutes(routes, pathname)[0];
    const [matchedRoute, setMatchedRoute] = useState(
        matched ? matched.route : null
    );

    useEffect(() => {
        const routeSettingsCheck = () => {
            setMatchedRoute(matched ? matched.route : null);
        };
        routeSettingsCheck();
    }, [pathname, matched]);

    return (
        <Layout pageTitle={matchedRoute ? matchedRoute.title : 'N/A'}>
            <Switch>{renderRoutes(routes)}</Switch>
        </Layout>
    );
};

export default withRouter(Router);
