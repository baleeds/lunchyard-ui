import React from 'react';
import { render, waitForElement, cleanup, wait, fireEvent } from '@testing-library/react';
import Lunches from '../components/lunches/Lunches';
import { useRouter as mockUseRouter, RouterProvider, startRouter } from '../lib/router';
import {
  ApolloLoadingProvider,
  ApolloErrorProvider,
  ApolloMockedProvider,
} from './utils/providers';
import { routes } from '../constants/routes';

afterEach(cleanup);

// jest.mock('../lib/router', function() {
//   return {
//     useRouter: jest.fn(() => ({ params: {} })),
//     useNavigate: () => ,
//   };
// });

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
    lunch: (...args) => console.log('GET LUNCH', args) || ({
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
    createLunch: (...args) => console.log(args) || ({
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
  // it('has loading indicator', async () => {
  //   const { getByText } = render(
  //     <ApolloLoadingProvider>
  //       <Lunches />
  //     </ApolloLoadingProvider>
  //   );

  //   getByText(/loading/i);
  // });

  // it('has error state', async () => {
  //   const { getByText } = render(
  //     <ApolloErrorProvider>
  //       <Lunches />
  //     </ApolloErrorProvider>
  //   );

  //   await wait();

  //   getByText(/having trouble/i);
  // });
  
  it('can show details', async () => {
    const { getByText, queryByText, debug, rerender } = render(
      <RouterProvider router={startRouter({ routes })}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );

    debug();
    // expect(mockUseRouter).toBeCalled();

    await waitForElement(() => queryByText('Birthday'));

    const birthdayLink = getByText('Birthday');

    fireEvent.click(birthdayLink);

    await wait();

    rerender(
      <RouterProvider router={startRouter({ routes })}>
        <ApolloMockedProvider customResolvers={resolvers}>
          <Lunches />
        </ApolloMockedProvider>
      </RouterProvider>
    );
    
    await waitForElement(() => queryByText(/order/i));
    debug();
  });

  // it('can be created', async () => {
  //   const { queryByText } = render(
  //     <ApolloMockedProvider customResolvers={resolvers}>
  //       <Lunches />
  //     </ApolloMockedProvider>
  //   );


  // });
});