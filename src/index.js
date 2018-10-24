import React from 'react';
import { render } from 'react-dom';
import Main from './components/App';
import { Provider } from 'react-redux';
import store from './store';

render(
    <Provider store={ store }>
        <Main />
    </Provider>, 
    document.getElementById('root')
)