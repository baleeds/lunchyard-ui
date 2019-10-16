import React from 'react';
import { render, wait, waitForElement } from '@testing-library/react';
import Lunches from '../components/lunches/Lunches';
import { useRouter as mockUseRouter } from '../lib/router';
import { lunchesQuery } from '../api/lunches/lunches.query';
import { MockedProvider } from '@apollo/react-testing';
import { lunchOptionsQuery } from '../api/lunches/lunchOptions.query';

jest.mock('../lib/router', function() {
  return {
    useRouter: jest.fn(() => ({ params: {} })),
    useNavigate: () => {},
  };
});

const mocks = [
  {
    request: {
      query: lunchOptionsQuery,
      variables: { first: 100 },
    },
    result: {
      data: {
        lunches: {
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
        }
      }
    }
  }
];

describe('Lunches', () => {
  it('can show details', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lunches />
      </MockedProvider>
    );

    expect(mockUseRouter).toBeCalled();

    await waitForElement(() => queryByText('Birthday'));
  });
});