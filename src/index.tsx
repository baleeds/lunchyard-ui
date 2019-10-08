import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/reset.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { startRouter } from './lib/router';
import routes from './constants/routes';
import client from './api/client';
import ModalController from './components/common/ModalController';
import { RouterProvider } from './lib/router';

// This router is homegrown as an expirement to solve three problems
// 1) Easily accessing router state in components with a hook
// 2) Not having the router polute the DOM tree with assumed divs
// 3) Rely on a central configuration of routes
const router = startRouter({ routes });

ReactDOM.render(
  <RouterProvider router={router}>
    <ApolloProvider client={client}>
      <ModalController>
        <App />
      </ModalController>
    </ApolloProvider>
  </RouterProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
