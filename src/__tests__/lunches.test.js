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

const detailsResolvers = {
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
};

const newLunch = {
  id: '2',
  date: new Date().toISOString(),
  occasion: 'new lunch',
  vendor: {
    id: '1',
    name: 'Food City',
  },
};

const createResolvers = {
  Query: () => ({
    lunch: () => newLunch,
  }),
  Mutation: () => ({
    createLunch: (_, args) => {
      const { input } = args || {};
      const { occasion } = input || {};

      if (!occasion || occasion === '') return new Error('Invalid input');

      return newLunch;
    },
  }),
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
        <ApolloMockedProvider customResolvers={detailsResolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    const birthdayLink = await waitForElement(() => queryByText('Birthday'));

    fireEvent.click(birthdayLink);

    await wait();

    rerender(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={detailsResolvers}>
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
      getByDisplayValue,
    } = render(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={createResolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    await wait(); // wait for apollo response

    const createButton = getByText(/create/i);
    fireEvent.click(createButton);

    await wait(); // wait for nav change

    const input = getByPlaceholderText(/lunch/i);
    // act(() => input.value = 'new lunch');
    fireEvent.change(input, { target: { value: 'new lunch' } });

    const button = getByTestId('createButton');
    fireEvent.click(button)

    await waitForElement(() => getByText(/order/i));
    await waitForElement(() => getByDisplayValue('new lunch'));
  });

  it('cant be created with invalid input', async () => {
    const router = startRouter({ routes });

    const {
      getByText,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <RouterProvider router={router}>
        <ApolloMockedProvider customResolvers={createResolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    await wait(); // wait for apollo response

    const createButton = getByText(/create/i);
    fireEvent.click(createButton);

    await wait(); // wait for nav change

    getByPlaceholderText(/lunch/i);

    const button = getByTestId('createButton');
    fireEvent.click(button);
    
    await wait();
    getByTestId('createButton');
  });

  it('can be edited', () => {

  })
});