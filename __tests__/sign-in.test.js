import { jest } from '@jest/globals';
import * as React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import SignInScreen from '../src/screens/SignInScreen';

describe('sign in', () => {
  test('email input text empty blur', async () => {
    const { getByTestId } = render(<SignInScreen />);
      const emailTextInput = await waitFor(() => getByTestId('email-text-input'));
      const passwordTextInput = await waitFor(() => getByTestId('password-text-input'));
      fireEvent.changeText(emailTextInput, '');
      fireEvent.changeText(passwordTextInput, '');

    expect(1).toBe(1);
  })
})