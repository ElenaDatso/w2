import PhotoInfo from './PhotoInfo';

interface PhotoData {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
  info?: PhotoInfo;
}

export default PhotoData;
