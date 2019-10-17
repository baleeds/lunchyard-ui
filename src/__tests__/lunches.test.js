import React from 'react';
import { render, waitForElement, wait, fireEvent } from '@testing-library/react';
import Lunches from '../components/lunches/Lunches';
import { RouterProvider, startRouter } from '../lib/router';
import {
  ApolloLoadingProvider,
  ApolloErrorProvider,
  ApolloMockedProvider,
} from './utils/providers';
import { routes } from '../constants/routes';

const resolvers = {
  Query: () => ({
    lunches: () => ({
      edges: [
        {
          node: {
            id: '1',
            date: new Date().toISOString(),
            occasion: 'Birthday',
            vendor: {
              id: '1',
              name: 'Food City',
            }
          }
        }
      ]
    }),
    lunch: () => ({
      id: '1',
      date: new Date().toISOString(),
      occasion: 'Birthday',
      vendor: {
        id: '1',
        name: 'Food City',
      },
    }),
  }),
  Mutation: () => ({
    createLunch: () => ({
      id: '1',
      date: new Date().toISOString(),
      occasion: 'Birthday',
      vendor: {
        id: '1',
        name: 'Food City',
      }
    })
  })
};

describe('Lunches', () => {
  it('has loading indicator', async () => {
    const router = startRouter({ routes });

    const { getByText } = render(
      <RouterProvider router={router}>
        <ApolloLoadingProvider>
          <Lunches />
        </ApolloLoadingProvider>
      </RouterProvider>
    );

    getByText(/loading/i);
  });

  it('has error state', async () => {
    const router = startRouter({ routes });

    const { getByText } = render(
      <RouterProvider router={router}>
        <ApolloErrorProvider>
          <Lunches />
        </ApolloErrorProvider>
      </RouterProvider>
    );

    await wait();

    getByText(/having trouble/i);
  });
  
  it('can show details', async () => {
    const router = startRouter({ routes });

    const { queryByText, rerender } = render(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    const birthdayLink = await waitForElement(() => queryByText('Birthday'));

    fireEvent.click(birthdayLink);

    await wait();

    rerender(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );
    
    await waitForElement(() => queryByText(/order/i));
  });

  it('can be created', async () => {
    const router = startRouter({ routes });

    const {
      getByText,
      getByPlaceholderText,
      getByTestId,
      rerender,
      queryByText,
    } = render(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    await wait();
    const createButton = getByText(/create/i);
    fireEvent.click(createButton);
    await wait();
    const input = getByPlaceholderText(/lunch/i);
    input.value = 'new lunch';
    const button = getByTestId('createButton');
    fireEvent.click(button);
    await wait();

    rerender(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    )
    await waitForElement(() => queryByText(/order/i));
  });
});