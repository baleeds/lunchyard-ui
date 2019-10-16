import React from 'react';
import { render, waitForElement, cleanup, wait } from '@testing-library/react';
import Lunches from '../components/lunches/Lunches';
import { useRouter as mockUseRouter } from '../lib/router';
import {
  ApolloLoadingProvider,
  ApolloErrorProvider,
  ApolloMockedProvider,
} from './utils/providers';

afterEach(cleanup);

jest.mock('../lib/router', function() {
  return {
    useRouter: jest.fn(() => ({ params: {} })),
    useNavigate: () => {},
  };
});

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
  }),
};

describe('Lunches', () => {
  it('has loading indicator', async () => {
    const { getByText } = render(
      <ApolloLoadingProvider>
        <Lunches />
      </ApolloLoadingProvider>
    );

    getByText(/loading/i);
  });

  it('has error state', async () => {
    const { getByText } = render(
      <ApolloErrorProvider>
        <Lunches />
      </ApolloErrorProvider>
    );

    await wait();

    getByText(/having trouble/i);
  })
  
  it('can show details', async () => {
    const { queryByText } = render(
      <ApolloMockedProvider customResolvers={resolvers}>
        <Lunches />
      </ApolloMockedProvider>
    );

    expect(mockUseRouter).toBeCalled();

    await waitForElement(() => queryByText('Birthday'));
  });
});