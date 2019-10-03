import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/reset.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { startRouter } from './router';
import routes from './constants/routes';
import client from './apollo/client';
import ModalController from './shared/ModalController';
import { RouterProvider } from './router';

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
