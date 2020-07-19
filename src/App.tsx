import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './Components/AppRouter';

const useStyles = makeStyles(() => ({
    panel: {
        padding: '32px',
        width: '50%',
        display: 'flex',
    },
    app: {
        textAlign: 'center',
        backgroundColor: 'rgb(134, 168, 218)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.app}>
            <Paper className={classes.panel} elevation={3}>
                <AppRouter />
            </Paper>
        </div>
    );
};

export default App;
