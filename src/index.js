import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import store, { sagaMiddleware } from './utils/store';
import saga from './sagas/saga';
import Routes from './utils/routes';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        //fontFamily: ['Roboto'].join(','),
        font: {
            color: '#333940',
        },
    },
    root: {
        color: '#333940',
    },
    palette: {
        tertiary: { main: '#004261' },
        primary: { main: '#fcfcfc' },
        secondary: { main: '#0084FF' },
        background: { default: '#fcfcfc' },
        error: { main: '#E10C32' },
        success: { main: '#00AB84' },
        buttonColor: { main: '#0099ff' },
    },
    overrides: {
        MuiSvgIcon: {
            root: {
                // fill: '#00B4D2',
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: 'white',
                color: '#333940',
            },
        },
        MuiDrawer: {
            paperAnchorRight: {
                width: '30%',
            },
        },
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: '1px solid #707070',
                },
                '&:before': {
                    borderBottom: '1px solid #707070',
                },
            },
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: '#0084FF',
            },
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                color: 'rgba(255, 255, 255, 0.54)',
            },
            toolbarBtnSelected: {
                color: '#fff',
            },
        },
        MuiPickersDay: {
            current: {
                color: '#0084FF',
            },
            daySelected: {
                color: '#fff',
                backgroundColor: '#0084FF',

                '&:hover': {
                    backgroundColor: '#0084FF',
                },
            },
        },
        MuiPickersYear: {
            current: {
                color: '#0084FF',
            },
            yearSelected: {
                color: '#fff',
                backgroundColor: '#0084FF',

                '&:hover': {
                    backgroundColor: '#0084FF',
                },
            },
        },
        MuiButton: {
            textPrimary: {
                color: '#0084FF',
            },
            contained: {
                color: '#fff',
                backgroundColor: '#0084FF',

                '&:hover': {
                    backgroundColor: '#0084FF',
                },
            },
        },
        App: {
            content: {
                padding: '0px',
            },
        },
    },
});

sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
        </MuiThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
