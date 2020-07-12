import React from 'react';
import FileUploader from './Components/FileUploader';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

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
                <FileUploader />
            </Paper>
        </div>
    );
};

export default App;
