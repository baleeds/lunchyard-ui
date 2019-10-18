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
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { MockLink } from 'apollo-link-mock';
import { lunchesQuery } from '../api/lunches/lunches.query';
import { lunchQuery } from '../api/lunches/lunch.query';

export const mockApolloClient = (mocks) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks),
  });
};


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

const updateResolvers = {
  ...createResolvers,
  Mutation: () => ({
    updateLunch: () => ({
      id: '1',
      date: new Date().toISOString(),
      occasion: 'Christmas',
      vendor: {
        id: '1',
        name: 'Food City',
      },
    })
  })
}

describe('Lunches', () => {
  // it('has loading indicator', async () => {
  //   const router = startRouter({ routes });

  //   const { getByText } = render(
  //     <RouterProvider router={router}>
  //       <ApolloLoadingProvider>
  //         <Lunches />
  //       </ApolloLoadingProvider>
  //     </RouterProvider>
  //   );

  //   getByText(/loading/i);
  // });

  // it('has error state', async () => {
  //   const router = startRouter({ routes });

  //   const { getByText } = render(
  //     <RouterProvider router={router}>
  //       <ApolloErrorProvider>
  //         <Lunches />
  //       </ApolloErrorProvider>
  //     </RouterProvider>
  //   );

  //   await wait();

  //   getByText(/having trouble/i);
  // });
  
  // it('can show details', async () => {
  //   const router = startRouter({ routes });

  //   const { queryByText, rerender } = render(
  //     <RouterProvider router={router}>
  //       <ApolloMockedProvider customResolvers={detailsResolvers}>
  //         <Lunches />
  //       </ApolloMockedProvider>
  //     </RouterProvider>
  //   );

  //   const birthdayLink = await waitForElement(() => queryByText('Birthday'));

  //   fireEvent.click(birthdayLink);

  //   await wait();

  //   rerender(
  //     <RouterProvider router={router}>
  //       <ApolloMockedProvider customResolvers={detailsResolvers}>
  //         <Lunches />
  //       </ApolloMockedProvider>
  //     </RouterProvider>
  //   );
    
  //   await waitForElement(() => queryByText(/order/i));
  // });

  // it('can be created', async () => {
  //   const router = startRouter({ routes });

  //   const {
  //     getByText,
  //     getByPlaceholderText,
  //     getByTestId,
  //     getByDisplayValue,
  //   } = render(
  //     <RouterProvider router={router}>
  //       <ApolloMockedProvider customResolvers={createResolvers}>
  //         <Lunches />
  //       </ApolloMockedProvider>
  //     </RouterProvider>
  //   );

  //   await wait(); // wait for apollo response

  //   const createButton = getByText(/create/i);
  //   fireEvent.click(createButton);

  //   await wait(); // wait for nav change

  //   const input = getByPlaceholderText(/lunch/i);
  //   // act(() => input.value = 'new lunch');
  //   fireEvent.change(input, { target: { value: 'new lunch' } });

  //   const button = getByTestId('createButton');
  //   fireEvent.click(button)

  //   await waitForElement(() => getByText(/order/i));
  //   await waitForElement(() => getByDisplayValue('new lunch'));
  // });

  // it('cant be created with invalid input', async () => {
  //   const router = startRouter({ routes });

  //   const {
  //     getByText,
  //     getByPlaceholderText,
  //     getByTestId,
  //   } = render(
  //     <RouterProvider router={router}>
  //       <ApolloMockedProvider customResolvers={createResolvers}>
  //         <Lunches />
  //       </ApolloMockedProvider>
  //     </RouterProvider>
  //   );

  //   await wait(); // wait for apollo response

  //   const createButton = getByText(/create/i);
  //   fireEvent.click(createButton);

  //   await wait(); // wait for nav change

  //   getByPlaceholderText(/lunch/i);

  //   const button = getByTestId('createButton');
  //   fireEvent.click(button);
    
  //   await wait();
  //   getByTestId('createButton');
  // });

  it('can be edited', async () => {    
    const router = startRouter({ routes });

    router.routeState = {
      activeId: 'lunches',
      id: 'lunchDetails',
      params: { lunchId: '1' },
      path: '/lunches/:lunchId',
    };

    const lunch = {
      id: '1',
      date: new Date().toISOString(),
      occasion: 'Birthday',
      vendor: {
        id: '1',
        name: 'Food City',
      }
    };
    
    const mockClient = mockApolloClient([{
      request: {
        query: lunchesQuery,
        variables: { first: 100 },
      },
      result: {
        data: {
          lunches: {
            edges: [
              {
                node: lunch,
              }
            ]
          }
        }
      }
    }, {
      request: {
        query: lunchQuery,
        variables: { id: '1' },
      },
      response: {
        data: {
          lunch,
        }
      }
    }]);

    // const clientMutateSpy = jest.spyOn(mockClient, 'mutate');
    // console.log(mockClient);

    const {
      getByDisplayValue,
      debug,
    } = render(
      <RouterProvider router={router}>
        <ApolloProvider client={mockClient}>
          <Lunches />
        </ApolloProvider>
      </RouterProvider>
    );

    await wait();

    const occasion = getByDisplayValue('Birthday');
    fireEvent.change(occasion, { target: { value: 'Christmas' } });
    fireEvent.focusOut(occasion);

    // expect(clientMutateSpy).toBeCalled();
    
    await wait();
    
    getByDisplayValue('Christmas');
    debug();
  })
});