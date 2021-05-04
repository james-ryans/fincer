import { jest, expect, test, describe } from '@jest/globals';
import * as React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import ProfileScreen, { ExistProfile } from '../src/screens/ProfileScreen';

// 9. profileScreen seharusnya menampilkan komponen EmptyProfile jika user null, 
// menampilkan ExistProfile jika user ada
describe(("check ProfileScreen display correctly"), () => {
  test('Test case: user null should display EmptyProfile component', async () => {
    const props = createExistProfileScreenProps({});
    const container = render(<ProfileScreen {...props} />);

    const existProfileScreen = container.getByTestId('exist-profile');

    expect(existProfileScreen).toBeTruthy();
  });

  test('Test case: user not null should display ExistProfile component', async () => {
    const props = createEmptyProfileScreenProps({});
    const container = render(<ProfileScreen {...props} />);

    const emptyProfileScreen = container.getByTestId('empty-profile');

    expect(emptyProfileScreen).toBeTruthy();
  });
});

// 8. ketika klik tombol button hapus profile, maka seharusnya muncul modal
describe("check ProfileScreen on press 'hapus profile' should show modal", () => {
  test('Test case: if profile exists', async () => {
    const container = render(<ExistProfile />);
    const hapusProfileButton = container.getByTestId('hapus-profile-button');

    await waitFor(() => {
      fireEvent.press(hapusProfileButton);
    });

    const hapusProfileModal = container.queryAllByTestId('hapus-profile-modal');
    expect(hapusProfileModal).not.toBeNull();
  });
});

// 10. Hapus profile modal tombol OK benar-benar panggil userRef.remove() dan kawan-kawan.
describe("check HapusProfileModal on press 'OK' should remove user", () => {
  test('Test case: if profile exists', async () => {
    const props = createProfileModalProps({});
    const container = render(<ProfileModal {...props} />);

    const hapusProfileModal = container.getTestById('hapus-profile-modal');
    const hapusProfileOK = container.getTestById('hapus-profile-ok');

    await waitFor(() => {
      fireEvent.press(hapusProfileOK);
    });

    expect(props.userRef.remove).toHaveBeenCalledTimes(1);
    expect(props.setRemoveModalVisible).toHaveBeenCalledTimes(1);
  });
});

const createExistProfileScreenProps = (props) => ({
  route: {
    params: {
      user: {
        imageURI: 'www.fincer.com/foto/first.jpg',
        name: 'First',
        subcategory: 'Facial Model',
        province: 'Sumatera Utara',
        city: 'Medan',
        price: 150000,
        description: 'ini cuma test',
      },
    },
  },
  ...props,
});

const createEmptyProfileScreenProps = (props) => ({
  route: {
    params: {
      user: null,
    },
  },
  ...props,
});

const createProfileModalProps = (props) => ({
  userRef: {
    remove: jest.fn(),
  },
  removeModalVisible: true,
  setRemoveModalVisible: jest.fn(),
  setIsLoading: jest.fn(),
});