import React, { useEffect, useState, Suspense } from 'react';

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
        const routeCheck = () => {
            setMatchedRoute(matched ? matched.route : null);
        };
        routeCheck();
    }, [pathname, matched]);

    return (
        <Layout pageTitle={matchedRoute ? matchedRoute.title : 'N/A'}>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>{renderRoutes(routes)}</Switch>
            </Suspense>
        </Layout>
    );
};

export default withRouter(Router);
