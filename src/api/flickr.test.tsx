import PhotoData from '../interfaces/PhotoData';
import getApi from './flickr';

test('server responds with correct data', async () => {
  const response = await getApi().getPhotoData('cat');

  expect(typeof response.data === 'object').toBe(true);
  expect(typeof response.data.photos === 'object').toBe(true);
  expect(Array.isArray(response.data.photos.photo)).toBe(true);
  expect(response.data.photos.photo.every((item: PhotoData) => typeof item === 'object')).toBe(
    true
  );
});

test('server responds with correct data', async () => {
  const response = await getApi().getPhotoInfo('52804943612');
  expect(typeof response.data.photo === 'object').toBe(true);
  expect(typeof response.data.photo.title._content === 'string').toBe(true);
});
