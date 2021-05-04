import { jest, expect, test, describe, beforeEach } from '@jest/globals';
import * as React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import CategoryCarousel from "../src/components/CategoryCarousel";
import { forIn } from 'lodash';

const category = {
  title: 'Model',
  items: [
    {
      imageURI: 'https://foto.com/foto1.jpg',
      name: 'First',
      subcategory: 'Facial Model',
      province: 'Sumatera Utara',
      city: 'Medan',
    },
    {
      imageURI: 'https://foto.com/foto2.jpg',
      name: 'Second',
      subcategory: 'Role Model',
      province: 'Sumatera Barat',
      city: 'Padang',
    },
    {
      imageURI: 'https://foto.com/foto3.jpg',
      name: 'Third',
      subcategory: 'Unknown Model',
      province: 'Jawa Barat',
      city: 'Tak Tau',
    },
  ]
};

// 6. behaviour dari button next dan previous bekerja dengan baik
// button next disabled ketika tampilan card sedang di paling terakhir
// button previous ketika tampilan card sedang di paling awal
describe('category carousel next & previous button work correctly', () => {
  let props, container;
  beforeEach(() => {
    props = createCategoryCarouselProps({});
    container = render(<CategoryCarousel {...props} />);
  });

  test('Test case: previous button should disabled when index = 0', async() => {
    const previousButton = container.getByTestId('previous-button');
    const nextButton = container.getByTestId('next-button');

    expect(previousButton.props.disabled).toBe(true);

    await waitFor(() => {
      fireEvent.press(nextButton);
    });
    
    expect(previousButton.props.disabled).toBe(false);
  });

  test('Test case: next button should disabled when index = x-1', async() => {
    const previousButton = container.getByTestId('previous-button');
    const nextButton = container.getByTestId('next-button');

    expect(nextButton.props.disabled).toBe(false);

    await waitFor(() => {
      fireEvent.press(nextButton);
    });
    await waitFor(() => {
      fireEvent.press(nextButton);
    });
    
    expect(previousButton.props.disabled).toBe(true);
  });
})

// 5. category carousel menampilkan data sesuai yang diinginkan
describe('check category carousel displays data correctly', () => {
  let props, container;
  beforeEach(() => {
    props = createCategoryCarouselProps({});
    container = render(<CategoryCarousel {...props} />);
  })

  test('Test case: given 3 items check carousel should have 3 components too', () => {
    const cards = container.queryAllByTestId(/^card-[0-9]+$/);
    expect(cards).toHaveLength(3);
  });

  test('Test case: every component render correctly', () => {
    const cards = container.queryAllByTestId(/^card-[0-9]+$/);

    for(const index in [0, 1, 2]) {
      const cardView = cards[index].props;

      const image = cardView.children[0][0].props;
      expect(image.source).toEqual({
        uri: category.items[index].imageURI
      });

      const cardTextView = cardView.children[0][1].props;

      const titleText = cardTextView.children[0].props.children;
      expect(titleText).toBe(category.items[index].name);

      const subCategoryText = cardTextView.children[1].props.children;
      expect(subCategoryText).toBe(category.items[index].subcategory);

      const locationText = cardTextView.children[2].props.children;
      expect(locationText).toEqual([category.items[index].province, ', ', category.items[index].city]);
    }
  });
});

// 4. navigasi ke InfluencerDetailScreen card jika di klik
describe('press category carousel card navigate to InfluencerDetailScreen with data', () => {
  test.each([
    [0, category.items[0].name, category.items[0]],
    [1, category.items[1].name, category.items[1]],
    [2, category.items[2].name, category.items[2]],
  ])("Test Case: item index=%i with name='%s'", async (index, name, item) => {
    const props = createCategoryCarouselProps({});
    const container = render(<CategoryCarousel {...props} />);

    const card = container.getByTestId(`card-${index}`);

    await waitFor(() => {
      fireEvent.press(card);
    });

    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    expect(props.navigation.navigate.mock.calls[0][0]).toBe('InfluencerDetail');
    expect(props.navigation.navigate.mock.calls[0][1]).toEqual({
      data: item,
    });
  });
});

const createCategoryCarouselProps = (props) => ({
  navigation: {
    navigate: jest.fn(),
  },
  navigateTo: 'InfluencerDetail',
  carouselItems: category,
  ...props,
});