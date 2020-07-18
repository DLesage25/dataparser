import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#eeeee',
        },
        secondary: {
            main: '#fcfcfc',
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                color: '#ffffff',
                backgroundColor: '#a3b9f7',
            },
        },
    },
});

const useStyles = makeStyles(() => ({
    wrapper: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        textAlign: 'left',
        overflow: 'hidden',
    },
    title: {
        color: '#555',
    },
    content: {
        paddingTop: '16px',
        boxSizing: 'border-box',
        width: '100%',
    },
}));

interface LayoutProps {
    children: React.ReactNode;
    pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <Grid className={classes.wrapper}>
                <span className={classes.title}>{pageTitle}</span>
                <Grid className={classes.content}>{children}</Grid>
            </Grid>
        </MuiThemeProvider>
    );
};

export default Layout;
