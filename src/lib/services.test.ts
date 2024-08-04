import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { submitAnswers } from 'src/lib/services';

const mock = new MockAdapter(axios);

describe('submitAnswers', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should return response when the API call is successful', async () => {
    const mockResponse = { success: true };
    const answers = { answer1: 'value1', answer2: 'value2' };

    mock.onPost('https://api.jsonbin.io/v3/b/').reply(200, mockResponse);

    const response: any = await submitAnswers(answers);
    expect(response.data).toEqual(mockResponse);
  });

  it('should throw an error when the API call fails', async () => {
    const answers = { answer1: 'value1', answer2: 'value2' };

    mock.onPost('https://api.jsonbin.io/v3/b/').reply(500);

    await expect(submitAnswers(answers)).rejects.toThrow();
  });
});
