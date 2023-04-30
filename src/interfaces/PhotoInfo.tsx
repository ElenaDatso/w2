import Tag from './TagData';

interface PhotoInfo {
  comments: { _content: string };
  dates: {
    lastupdate: string;
    posted: string;
    taken: string;
    takengranularity: number;
    takenunknown: string;
  };
  dateuploaded: string;
  description: { _content: string };
  owner: {
    gift: { gift_eligible: true; eligible_durations: []; new_flow: true };
    realname: string;
    username: string;
  };
  tags: { tag: Tag[] };
  title: { _content: string };
  views: string;
  visibility: { ispublic: number; isfriend: number; isfamily: number };
}

export default PhotoInfo;
