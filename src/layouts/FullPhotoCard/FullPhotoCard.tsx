import React, { useState } from 'react';
import classes from './FullPhotoCard.module.scss';
import PhotoData from '../../interfaces/PhotoData';
import Tag from '../Tag/Tag';
import { MdPerson2 } from 'react-icons/md';
import Lost from '../../assets/lost.jpg';

const FullPhotoCard: React.FC<PhotoData> = ({ title, id, secret, server, info }) => {
  const dateCreated = info ? new Date(+info.dates.posted * 1000).toLocaleString() : 'unknown';
  const dateUpdated = info ? new Date(+info.dates.lastupdate * 1000).toLocaleString() : 'unknown';
  const [isLost, setIsLost] = useState(false);
  fetch(`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`)
    .then((data) => {
      if (data.status === 500) {
        setIsLost(true);
        throw Error;
      }
    })
    .catch(() => Error);
  return (
    <div className={classes.cardStyle}>
      <img
        src={isLost ? Lost : `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
        alt={title}
        className={classes.cover}
      />
      <h2 className={classes.h2}>{title}</h2>
      {info && (
        <>
          <div className={classes.basicInfo}>
            <div className={classes.basicInfoRow}>
              <MdPerson2></MdPerson2>
              <p>by {info.owner.realname ? info.owner.realname : info.owner.username}</p>
            </div>
            <div className={classes.datesWrap}>
              <p>created: {dateCreated}</p>
              {info.dates.posted !== info.dates.lastupdate && <p>last updated: {dateUpdated}</p>}
            </div>
          </div>
          <h6 className={classes.h6}>Description:</h6>
          <div className={classes.aditionalInfo}>
            <p className={classes.description}>
              {info.description._content
                ? info.description._content
                : 'No description was added...'}
            </p>
          </div>
          <h6 className={classes.h6}>Tags:</h6>
          <div className={classes.tagsWrap}>
            {info.tags.tag.length > 0 && info.tags.tag.map((tag) => Tag(tag.raw))}
            {info.tags.tag.length === 0 && <span>No tags</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default FullPhotoCard;
