import React from 'react';
import { render } from '@testing-library/react';
import { FormGroup } from './FormGroup';

describe('Form group', () => {
  it('can have a label', () => {
    const { getByText } = render(<FormGroup label="My label" htmlFor="myInput"><input type="text" name="myInput" /></FormGroup>);

    expect(getByText('My label')).toHaveAttribute('for', 'myInput');
  });
});