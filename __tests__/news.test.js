import { jest, expect, test, describe, beforeEach, afterEach } from '@jest/globals';
import * as React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { FetchNewYorkTimesService } from '../src/services/FetchNewsService';

describe('check fetch new york times api', () => {
  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  })

  test('Test case: response OK should return results correctly', async () => {
    const mockSuccessResponse = [
      {
        title: 'Test',
        abstract: 'test adalah test',
        url: 'www.fincer.com',
        byline: 'James',
        multimedia: [{ url: 'www.fincer.com/foto/test.jpg' }],
      },
    ];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await FetchNewYorkTimesService();
    
    expect(fetch).toHaveBeenCalledWith('https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=SGIrrwebH4QGgqXd8k8M94iAmGMylWGB');
    expect(result).toEqual(mockSuccessResponse);
  });

  test('Test case: response FAIL should return null', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => { Promise.reject('API is down') });
    
    const result = await FetchNewYorkTimesService();

    expect(fetch).toHaveBeenCalledWith('https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=SGIrrwebH4QGgqXd8k8M94iAmGMylWGB');
    expect(result).toBeNull();
  })
});