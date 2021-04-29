import { jest, expect, test, describe } from '@jest/globals';
import * as React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import SignInScreen from '../src/screens/SignInScreen';

describe('email & password empty submit', () => {
  test("Test case: email='' & password=''", async () => {
    const container = render(<SignInScreen />);
    const submitButton = container.getByTestId('submit-button');
  
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
  
    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');
  
    expect(emailWarning).toBeTruthy();
    expect(passwordWarning).toBeTruthy();
  });
})

describe('email empty submit', () => {
  test("Test case: email='' & password='secret'", async () => {
    const container = render(<SignInScreen />);
    const submitButton = container.getByTestId('submit-button');
    const passwordTextInput = container.getByTestId('password-text-input');
  
    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'secret');
    })
  
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
  
    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');
  
    expect(emailWarning).toBeTruthy();
    expect(passwordWarning).toBeNull();
  });
})

describe('password empty submit', () => {
  test("Test case: email='hello@fincer.com' & password=''", async () => {
    const container = render(<SignInScreen />);
    const submitButton = container.getByTestId('submit-button');
    const emailTextInput = container.getByTestId('email-text-input');
  
    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'hello@fincer.com');
    })
  
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
  
    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');
  
    expect(emailWarning).toBeNull();
    expect(passwordWarning).toBeTruthy();
  });
});

describe('email not valid', () => {
  test("Test case: email='hello@fincer' & password='secret'", async () => {
    const container = render(<SignInScreen />);
    const submitButton = container.getByTestId('submit-button');
    const emailTextInput = container.getByTestId('email-text-input');
    const passwordTextInput = container.getByTestId('password-text-input');
  
    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'hello@fincer');
    })
  
    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'secret');
    })
  
    await waitFor(() => {
      fireEvent.press(submitButton);
    });
  
    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');
  
    expect(emailWarning.children[0]).toBe('Invalid email address');
    expect(passwordWarning).toBeNull();
  });
});

describe('password not more than 6 characters', () => {
  test.each([
    [Math.random().toString(36).substring(2, 3)],
    [Math.random().toString(36).substring(2, 4)],
    [Math.random().toString(36).substring(2, 5)],
    [Math.random().toString(36).substring(2, 6)],
    [Math.random().toString(36).substring(2, 7)],
  ])("Test case: email='hello@fincer.com' & password='%s'", async (password) => {
    const container = render(<SignInScreen />);
    const submitButton = container.getByTestId('submit-button');
    const emailTextInput = container.getByTestId('email-text-input');
    const passwordTextInput = container.getByTestId('password-text-input');

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'hello@fincer.com');
    })

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, password);
    })

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');

    expect(emailWarning).toBeNull();
    expect(passwordWarning.children[0]).toBe('Must be 6 characters or more');
  });
});

describe('if pass validation should call onSubmit', () => {
  test("Test case: email='admin@fincer.com' & password='secret'", async () => {
    const props = createSignInScreenProps({});
    const container = render(<SignInScreen {...props} />);
    const submitButton = container.getByTestId('submit-button');
    const emailTextInput = container.getByTestId('email-text-input');
    const passwordTextInput = container.getByTestId('password-text-input');

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, 'admin@fincer.com');
    })

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, 'secret');
    })

    await waitFor(() => {
      fireEvent.press(submitButton);
    });

    const emailWarning = container.queryByTestId('email-warning');
    const passwordWarning = container.queryByTestId('password-warning');

    expect(emailWarning).toBeNull();
    expect(passwordWarning).toBeNull();
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("press 'ayo daftar' should navigate to SignUpScreen", () => {
  test.each([
    ['', ''],
    ['', 'secret'],
    ['hello@fincer.com', ''],
    ['hello@fincer', 'abc'],
    ['hello@fincer.com', 'secret'],
  ])("Test case: email='%s' & password='%s'", async (email, password) => {
    const props = createSignInScreenProps({});
    const container = render(<SignInScreen {...props} />);
    const emailTextInput = container.getByTestId('email-text-input');
    const passwordTextInput = container.getByTestId('password-text-input');
    const signUpButton = container.getByTestId('sign-up-button');

    await waitFor(() => {
      fireEvent.changeText(emailTextInput, email);
    })

    await waitFor(() => {
      fireEvent.changeText(passwordTextInput, password);
    })

    await waitFor(() => {
      fireEvent.press(signUpButton);
    });

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});

const createSignInScreenProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
  },
  onSubmit: jest.fn(),
  ...props,
});