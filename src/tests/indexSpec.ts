import app from '../index';
import { promises as fs } from 'fs';
import File from '../utilities/file-system';
import path from 'path';
import supertest from 'supertest';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('response for endpoint: /', (): void => {
  it('gets /', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/');

    expect(response.status).toBe(200);
  });
});

describe('response for endpoint: /api/images', (): void => {
  it('gets /api/images?filename=palmtunnel (valid argument)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel'
    );

    expect(response.status).toBe(200);
  });

  it('gets /api/images?filename=palmtunnel&width=150&height=150 (valid argument)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel&width=150&height=150'
    );

    expect(response.status).toBe(200);
  });

  it('gets /api/images?filename=palmtunnel&width=-300&height=200 (invalid argument)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel&width=-300&height=200'
    );

    expect(response.status).toBe(200);
  });

  it('gets /api/images?filename=palmtunnel&width=300&height=-200 (invalid argument)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel&width=300&height=-200'
    );

    expect(response.status).toBe(200);
  });

  it('gets /api/images?filename=palmtunnel&width=300 (msg missing height param)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel&width=300'
    );
    const errmsg: string =
      "Please put a positive numerical value for 'height' param";
    expect(errmsg).toEqual(response.text);
  });

  it('gets /api/images?filename=palmtunnel&height=300 (msg missing width param)', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?filename=palmtunnel&height=300'
    );
    const errmsg: string =
      "Please put a positive numerical value for 'width' param";
    expect(errmsg).toEqual(response.text);
  });

  it('gets /api/images (no arguments)', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');

    expect(response.status).toBe(200);
  });

  describe('endpoint: /miniimg', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/miniimg');

      expect(response.status).toBe(404);
    });
  });
});

// Delete files used on test
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'palmtunnel-150x150.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // file not found something is wrong with the test
  }
});
