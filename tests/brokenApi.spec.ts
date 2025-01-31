import { test, expect } from '@playwright/test';
import axios from 'axios';

test('API should return 404 for a broken api', async () => {
  try {
    await axios.get('http://localhost:3000/api/broken');
  } catch (error: any) {
    expect(error.response.status).toBe(404);
    console.log('Verified that broken API returns 404');
  }
});
