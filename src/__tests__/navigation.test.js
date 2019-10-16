import React from 'react';
import { render, getByText as globalGetByText, fireEvent } from '@testing-library/react';
import { RouterProvider, startRouter } from '../lib/router';
import { App } from '../components/App';
import { routes } from '../constants/routes';

describe('Navigation', () => {
  it('can show the lunches page', () => {
    const router = startRouter({ routes });
    
    const { getByTestId } = render(
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    );

    const nav = getByTestId('nav');

    const lunchesLink = globalGetByText(nav, /lunches/i);
    fireEvent.click(lunchesLink);
    expect(window.location.href).toContain('lunches');

    const restaurantsLink = globalGetByText(nav, /restaurants/i);
    fireEvent.click(restaurantsLink);
    expect(window.location.href).toContain('restaurants');
  });
})