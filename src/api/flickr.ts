import axios from 'axios';
import PhotoData from '../interfaces/PhotoData';
import PhotoInfo from '../interfaces/PhotoInfo';

export default function () {
  const API_KEY = 'ad3ad555dd3292925321ec36efca1184';
  const BASE_URL = 'https://api.flickr.com/services/rest/';
  return {
    getPhotoData(searchValue: string) {
      return axios.get<{ photos: { photo: PhotoData[] } }>(
        `${BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&text=${searchValue}&format=json&nojsoncallback=1`
      );
    },
    getPhotoInfo(photoId: string) {
      return axios.get<{ photo: PhotoInfo }>(
        `${BASE_URL}?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`
      );
    },
  };
}
